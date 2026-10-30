$port = 8080
$path = "C:\Users\ELCOT\.gemini\antigravity\scratch\avathar-ai-academy"

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Prefixes.Add("http://127.0.0.1:$port/")

try {
    $listener.Start()
    Write-Host "Server running at http://localhost:$port/"
} catch {
    Write-Host "Error starting listener: $_"
    exit 1
}

$mimeTypes = @{
    ".html" = "text/html"
    ".css"  = "text/css"
    ".js"   = "application/javascript"
    ".svg"  = "image/svg+xml"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".json" = "application/json"
    ".ico"  = "image/x-icon"
    ".mp4"  = "video/mp4"
    ".webm" = "video/webm"
}

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $urlPath = $request.Url.LocalPath
        if ($urlPath -eq "/" -or [string]::IsNullOrWhiteSpace($urlPath)) {
            $urlPath = "/index.html"
        }

        $localFilePath = Join-Path $path ($urlPath.TrimStart("/").Replace("/", "\"))

        if (Test-Path $localFilePath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($localFilePath).ToLower()
            $mime = if ($mimeTypes.ContainsKey($ext)) { $mimeTypes[$ext] } else { "application/octet-stream" }
            $response.ContentType = $mime
            $response.AddHeader("Accept-Ranges", "bytes")

            $fileInfo = New-Object System.IO.FileInfo($localFilePath)
            $totalLength = $fileInfo.Length

            $rangeHeader = $request.Headers["Range"]
            if ($rangeHeader -and $rangeHeader.StartsWith("bytes=")) {
                $range = $rangeHeader.Substring(6).Split("-")
                $start = [long]::Parse($range[0])
                $end = if (![string]::IsNullOrEmpty($range[1])) { [long]::Parse($range[1]) } else { $totalLength - 1 }
                if ($end -ge $totalLength) { $end = $totalLength - 1 }
                $length = $end - $start + 1

                $response.StatusCode = 206
                $response.AddHeader("Content-Range", "bytes $start-$end/$totalLength")
                $response.ContentLength64 = $length

                $fs = [System.IO.File]::OpenRead($localFilePath)
                $fs.Seek($start, [System.IO.SeekOrigin]::Begin) | Out-Null
                $buffer = New-Object byte[] 65536
                $bytesRemaining = $length
                while ($bytesRemaining -gt 0) {
                    $bytesToRead = [Math]::Min($bytesRemaining, $buffer.Length)
                    $bytesRead = $fs.Read($buffer, 0, $bytesToRead)
                    if ($bytesRead -le 0) { break }
                    $response.OutputStream.Write($buffer, 0, $bytesRead)
                    $bytesRemaining -= $bytesRead
                }
                $fs.Close()
            } else {
                $response.StatusCode = 200
                $response.ContentLength64 = $totalLength
                $fs = [System.IO.File]::OpenRead($localFilePath)
                $fs.CopyTo($response.OutputStream)
                $fs.Close()
            }
        } else {
            $response.StatusCode = 404
            $errBytes = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
            $response.OutputStream.Write($errBytes, 0, $errBytes.Length)
        }
        $response.Close()
    } catch {
        # ignore client disconnects
    }
}
