$dir = Join-Path $PSScriptRoot "..\public\clients"

$renames = @{
    "arabika bakery.png"          = "arabika-bakery.png"
    "arabika coffee.png"          = "arabika-coffee.png"
    "cnb expres.jpeg"             = "cnb-expres.jpeg"
    "kalo coffee.png"             = "kalo-coffee.png"
    "la vita.jpeg"                = "la-vita.jpeg"
    "little italy.png"            = "little-italy.png"
    "local coffee.png"            = "local-coffee.png"
    "munch station.jpeg"          = "munch-station.jpeg"
    "pan chini.jpg"               = "pan-chini.jpg"
    "ray bd.png"                  = "ray-bd.png"
    "royal multsports arena.jpeg" = "royal-multsports-arena.jpeg"
    "the bowl.png"                = "the-bowl.png"
    "vim .jpeg"                   = "vim.jpeg"
}

foreach ($old in $renames.Keys) {
    $src  = Join-Path $dir $old
    $dest = Join-Path $dir $renames[$old]
    if (Test-Path $src) {
        Rename-Item -Path $src -NewName $renames[$old]
        Write-Host "Renamed: $old -> $($renames[$old])"
    } else {
        Write-Host "Not found (skipping): $old"
    }
}

Write-Host "Done."
