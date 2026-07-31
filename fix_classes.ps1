$files = Get-ChildItem -Path *.html

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8

    $content = $content -replace 'class="grid"\s+class="grid grid-3"', 'class="grid grid-3"'
    $content = $content -replace 'class="grid"\s+class="grid grid-2"', 'class="grid grid-2"'
    $content = $content -replace 'class="grid"\s+class="grid grid-2-1"', 'class="grid grid-2-1"'
    $content = $content -replace 'class="grid"\s+class="grid grid-1"', 'class="grid grid-1"'

    Set-Content -Path $file.FullName -Value $content -Encoding UTF8
}
