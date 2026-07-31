$files = Get-ChildItem -Path *.html

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    
    # Check if already has menu-toggle to avoid duplicates
    if (-not $content.Contains('class="menu-toggle"')) {
        $content = $content -replace '</nav>', "</nav>`n            <div class=`"menu-toggle`" id=`"mobile-menu`">`n                <i class=`"fas fa-bars`"></i>`n            </div>"
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8
    }
}
