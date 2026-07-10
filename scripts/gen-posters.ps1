$reelsDir  = Join-Path $PSScriptRoot "..\public\reels"
$postersDir = Join-Path $reelsDir "posters"

if (-not (Test-Path $postersDir)) {
    New-Item -ItemType Directory -Path $postersDir | Out-Null
    Write-Host "Created: $postersDir"
}

Get-ChildItem -Path $reelsDir -Filter "*.mp4" | ForEach-Object {
    $stem   = $_.BaseName
    $input  = $_.FullName
    $output = Join-Path $postersDir "$stem.jpg"

    Write-Host "Generating poster for $($_.Name) ..."
    & ffmpeg -y -ss 00:00:01 -i $input -vframes 1 -vf "scale=540:-2" -q:v 6 $output 2>&1 | Out-Null

    if (Test-Path $output) {
        Write-Host "  -> $stem.jpg"
    } else {
        Write-Host "  FAILED: $stem.jpg"
    }
}

Write-Host "Done."
