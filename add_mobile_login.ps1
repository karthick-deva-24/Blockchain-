$files = Get-ChildItem -Path *.html

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    
    # Check if we have the mobile-login already
    if (-not $content.Contains('class="mobile-login"')) {
        # Inject the login li right before the closing </ul> inside <nav class="nav">
        $content = $content -replace '</ul>\s*</nav>', "<li class=`"mobile-login`"><a href=`"login.html`" class=`"btn-primary`">LOGIN</a></li>`n                </ul>`n            </nav>"
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8
    }
}
