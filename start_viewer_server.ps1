param(
  [int]$Port = 4173
)

$ErrorActionPreference = "Stop"
Set-Location -LiteralPath $PSScriptRoot
python -m http.server $Port --bind 127.0.0.1
