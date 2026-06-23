param(
  [string]$Src,
  [string]$Out
)

Add-Type -AssemblyName System.Drawing

$img = [System.Drawing.Bitmap]::FromFile($Src)
$w = $img.Width
$h = $img.Height
$bmp = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$gfx = [System.Drawing.Graphics]::FromImage($bmp)
$gfx.DrawImage($img, 0, 0)

function Test-BgColor([System.Drawing.Color]$c) {
  return ($c.R -gt 230) -and ($c.G -gt 230) -and ($c.B -gt 230)
}

$visited = New-Object 'bool[,]' $w, $h
$queue = New-Object System.Collections.Generic.Queue[object]

for ($x = 0; $x -lt $w; $x++) {
  foreach ($y in (0, ($h - 1))) {
    $color = $bmp.GetPixel($x, $y)
    if ((Test-BgColor $color) -and -not $visited[$x, $y]) {
      $visited[$x, $y] = $true
      $queue.Enqueue([int[]]@($x, $y))
    }
  }
}

for ($y = 0; $y -lt $h; $y++) {
  foreach ($x in (0, ($w - 1))) {
    $color = $bmp.GetPixel($x, $y)
    if ((Test-BgColor $color) -and -not $visited[$x, $y]) {
      $visited[$x, $y] = $true
      $queue.Enqueue([int[]]@($x, $y))
    }
  }
}

while ($queue.Count -gt 0) {
  $point = $queue.Dequeue()
  $x = $point[0]
  $y = $point[1]
  $bmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))

  $neighbors = @(
    @($x - 1, $y),
    @($x + 1, $y),
    @($x, $y - 1),
    @($x, $y + 1)
  )

  foreach ($n in $neighbors) {
    $nx = $n[0]
    $ny = $n[1]
    if ($nx -lt 0 -or $nx -ge $w -or $ny -lt 0 -or $ny -ge $h) { continue }
    if ($visited[$nx, $ny]) { continue }
    $nc = $bmp.GetPixel($nx, $ny)
    if (Test-BgColor $nc) {
      $visited[$nx, $ny] = $true
      $queue.Enqueue([int[]]@($nx, $ny))
    }
  }
}

$bmp.Save($Out, [System.Drawing.Imaging.ImageFormat]::Png)
$gfx.Dispose()
$bmp.Dispose()
$img.Dispose()

Write-Output "Saved $Out"
