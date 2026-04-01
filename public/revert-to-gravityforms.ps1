# PowerShell script to revert form buttons back to GravityForms submission
$workspaceRoot = "C:\Users\weifang\Projects\calgry-city-roofing\public"

Write-Host "Reverting footer forms back to GravityForms submission..." -ForegroundColor Green

# Find all HTML files
$htmlFiles = Get-ChildItem -Path $workspaceRoot -Filter "*.html" -Recurse

$filesProcessed = 0
$filesReverted = 0

foreach ($file in $htmlFiles) {
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    
    # Skip if file doesn't have our custom button onclick
    if ($content -notmatch "onclick='sendFooterEmailInsteadOfSubmit\(\);'" -and 
        $content -notmatch 'onclick="sendFooterEmailInsteadOfSubmit\(\);"' -and
        $content -notmatch "onclick='sendMainFormEmailInsteadOfSubmit\(\);'" -and
        $content -notmatch 'onclick="sendMainFormEmailInsteadOfSubmit\(\);"') {
        continue
    }
    
    $filesProcessed++
    $originalContent = $content
    
    # Revert footer form (form ID 3) button back to GravityForms submission
    $content = $content -replace "type='button' id='gform_submit_button_3' class='gform_button button' onclick='sendFooterEmailInsteadOfSubmit\(\);'", "type='submit' id='gform_submit_button_3' class='gform_button button' onclick='gform.submission.handleButtonClick(this);'"
    $content = $content -replace 'type="button" id="gform_submit_button_3" class="gform_button button" onclick="sendFooterEmailInsteadOfSubmit\(\);"', 'type="submit" id="gform_submit_button_3" class="gform_button button" onclick="gform.submission.handleButtonClick(this);"'
    
    # Revert main form (form ID 2) button back to GravityForms submission  
    $content = $content -replace "type='button' id='gform_submit_button_2' class='gform_button button' onclick='sendMainFormEmailInsteadOfSubmit\(\);'", "type='submit' id='gform_submit_button_2' class='gform_button button' onclick='gform.submission.handleButtonClick(this);'"
    $content = $content -replace 'type="button" id="gform_submit_button_2" class="gform_button button" onclick="sendMainFormEmailInsteadOfSubmit\(\);"', 'type="submit" id="gform_submit_button_2" class="gform_button button" onclick="gform.submission.handleButtonClick(this);"'
    
    # Check if changes were made
    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8
        $filesReverted++
        Write-Host "Reverted: $($file.FullName)" -ForegroundColor Yellow
    }
}

Write-Host "`nReversion Summary:" -ForegroundColor Cyan
Write-Host "Files processed: $filesProcessed" -ForegroundColor White
Write-Host "Files reverted: $filesReverted" -ForegroundColor Green
Write-Host "`nForm buttons are now back to using GravityForms submission with our JavaScript intercepting the submission." -ForegroundColor Green