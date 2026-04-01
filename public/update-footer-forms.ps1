# PowerShell script to update footer forms across non-archived files
# This script will update the gform_submit_button_3 forms to use mailto instead of form submission

# List of files to exclude (archived directories)
$excludePatterns = @("*\2023\*", "*\2024\*", "*\2025\*")

# Get all HTML files in the workspace
$workspaceRoot = "c:\Users\weifang\Projects\calgry-city-roofing"
$htmlFiles = Get-ChildItem -Path $workspaceRoot -Recurse -Filter "*.html" | Where-Object {
    $exclude = $false
    foreach ($pattern in $excludePatterns) {
        if ($_.FullName -like $pattern) {
            $exclude = $true
            break
        }
    }
    return -not $exclude
}

Write-Host "Found $($htmlFiles.Count) HTML files to process (excluding archived files)..."

# Counters for tracking changes
$filesWithFooterForm = 0
$filesUpdated = 0
$filesAlreadyUpdated = 0
$filesWithScript = 0

foreach ($file in $htmlFiles) {
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    
    # Skip if file doesn't have the footer form
    if ($content -notmatch "gform_submit_button_3") {
        continue
    }
    
    $filesWithFooterForm++
    $originalContent = $content
    $updated = $false
    
    # Check if already updated (has button type and onclick to our function)
    if ($content -match "type='button'.*id='gform_submit_button_3'.*onclick='sendFooterEmailInsteadOfSubmit\(\);'") {
        $filesAlreadyUpdated++
        Write-Host "Already updated: $($file.Name)" -ForegroundColor Green
    } else {
        # Update the button from submit to button and change onclick
        $content = $content -replace "type='submit' id='gform_submit_button_3' class='gform_button button' onclick='gform\.submission\.handleButtonClick\(this\);'", "type='button' id='gform_submit_button_3' class='gform_button button' onclick='sendFooterEmailInsteadOfSubmit();'"
        
        if ($content -ne $originalContent) {
            $updated = $true
            $filesUpdated++
            Write-Host "Updated button: $($file.Name)" -ForegroundColor Yellow
        }
    }
    
    # Check if script include is needed
    $needsScript = $content -notmatch 'src=".*footer-form\.js"' -and $content -notmatch "src='.*footer-form\.js'"
    
    if ($needsScript) {
        # Determine correct relative path to js/footer-form.js
        $relativePath = $file.DirectoryName
        $relativeToRoot = [System.IO.Path]::GetRelativePath($workspaceRoot, $relativePath)
        
        if ($relativeToRoot -eq ".") {
            # File is in root directory
            $scriptPath = "js/footer-form.js"
        } else {
            # File is in subdirectory, need to go up
            $levels = ($relativeToRoot -split "\\").Count
            $upPath = ("..\" * $levels).TrimEnd('\')
            $scriptPath = "$upPath/js/footer-form.js"
        }
        
        # Add the script include before the last script tag (usually Cloudflare beacon)
        $scriptInclude = "<script type=`"text/javascript`" src=`"$scriptPath`"></script>"
        
        # Try to find a good place to insert - before the last script or before </body>
        if ($content -match '<script defer.*cloudflareinsights.*</script>') {
            $content = $content -replace '(<script defer.*cloudflareinsights.*</script>)', "$scriptInclude`r`n$1"
            $updated = $true
            $filesWithScript++
            Write-Host "Added script include ($scriptPath): $($file.Name)" -ForegroundColor Cyan
        } elseif ($content -match '</body>') {
            $content = $content -replace '</body>', "$scriptInclude`r`n</body>"
            $updated = $true
            $filesWithScript++
            Write-Host "Added script include before </body> ($scriptPath): $($file.Name)" -ForegroundColor Cyan
        }
    }
    
    # Save the file if it was updated
    if ($updated) {
        try {
            Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
            Write-Host "Saved: $($file.FullName)" -ForegroundColor Green
        } catch {
            Write-Host "Error saving $($file.FullName): $($_.Exception.Message)" -ForegroundColor Red
        }
    }
}

# Summary
Write-Host "`n=== SUMMARY ===" -ForegroundColor Magenta
Write-Host "Total HTML files processed: $($htmlFiles.Count)" -ForegroundColor White
Write-Host "Files with footer form: $filesWithFooterForm" -ForegroundColor White
Write-Host "Files updated (button): $filesUpdated" -ForegroundColor Yellow
Write-Host "Files already updated: $filesAlreadyUpdated" -ForegroundColor Green
Write-Host "Files with script added: $filesWithScript" -ForegroundColor Cyan

Write-Host "`nDone! All non-archived files have been processed." -ForegroundColor Green