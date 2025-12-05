param(
    [int]$Port = 5500,
    [string]$Root = "C:\Users\paceg\OneDrive\Documents\wdd231\final"
)

$prefix = "http://127.0.0.1:$Port/"
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)
$listener.Start()
Write-Output "Serving $Root on $prefix"

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $req = $context.Request
        $path = [System.Uri]::UnescapeDataString($req.Url.LocalPath.TrimStart('/'))
        if ($path -eq '') { $path = 'index.html' }
        $file = Join-Path $Root ($path -replace '/','\\')
        $ext = [System.IO.Path]::GetExtension($file).ToLowerInvariant()
        $mimeMap = @{
            '.html' = 'text/html'; '.htm' = 'text/html'; '.css' = 'text/css'; '.js' = 'application/javascript';
            '.png' = 'image/png'; '.jpg' = 'image/jpeg'; '.jpeg' = 'image/jpeg'; '.gif' = 'image/gif';
            '.svg' = 'image/svg+xml'; '.json' = 'application/json'; '.txt' = 'text/plain'
        }
        $mime = $null
        if ($mimeMap.ContainsKey($ext)) { $mime = $mimeMap[$ext] }

        if (Test-Path $file) {
            $bytes = [System.IO.File]::ReadAllBytes($file)
            if ($mime) { $context.Response.ContentType = $mime } else { $context.Response.ContentType = 'application/octet-stream' }
            $context.Response.ContentLength64 = $bytes.Length
            $context.Response.OutputStream.Write($bytes,0,$bytes.Length)
            $context.Response.OutputStream.Close()
        } else {
            $context.Response.StatusCode = 404
            $context.Response.ContentType = 'text/plain'
            $buffer = [System.Text.Encoding]::UTF8.GetBytes('404 Not Found')
            $context.Response.OutputStream.Write($buffer,0,$buffer.Length)
            $context.Response.OutputStream.Close()
        }
    }
} finally {
    $listener.Stop()
}
