# Download and extract cwebp
Write-Host "Downloading libwebp..."
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
Invoke-WebRequest -Uri "https://storage.googleapis.com/downloads.webmproject.org/releases/webp/libwebp-1.3.2-windows-x64.zip" -OutFile "libwebp.zip"
Expand-Archive -Path "libwebp.zip" -DestinationPath "." -Force

$cwebp = ".\libwebp-1.3.2-windows-x64\bin\cwebp.exe"

# Process all images
$images = Get-ChildItem -Path "images" -Include "*.jpg", "*.png" -Recurse

foreach ($img in $images) {
    $outName = [System.IO.Path]::ChangeExtension($img.FullName, ".webp")
    Write-Host "Converting $($img.Name) to WebP..."
    
    # Compress with target size of 90KB (90000 bytes) to safely be under 100KB
    & $cwebp $img.FullName -size 90000 -pass 6 -o $outName
    
    # Wait for the process to release the file handle
    Start-Sleep -Milliseconds 100
    
    if (Test-Path $outName) {
        Remove-Item $img.FullName -Force
        Write-Host "Success: $($img.Name) converted."
    } else {
        Write-Host "Failed to convert $($img.Name)"
    }
}

# Update references in HTML and CSS
$textFiles = Get-ChildItem -Path "." -Include "*.html", "*.css", "*.js" -Recurse
foreach ($file in $textFiles) {
    if ($file.FullName -match "libwebp") { continue }
    
    $content = [System.IO.File]::ReadAllText($file.FullName)
    
    # Safely replace .jpg and .png with .webp
    $newContent = [regex]::Replace($content, '(?i)\.jpg(?=["''\s\)])', '.webp')
    $newContent = [regex]::Replace($newContent, '(?i)\.png(?=["''\s\)])', '.webp')
    
    if ($content -cne $newContent) {
        [System.IO.File]::WriteAllText($file.FullName, $newContent, [System.Text.Encoding]::UTF8)
        Write-Host "Updated image references in $($file.Name)"
    }
}

# Cleanup
Remove-Item "libwebp.zip" -Force
Remove-Item "libwebp-1.3.2-windows-x64" -Recurse -Force
Write-Host "All done perfectly!"
