<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

echo json_encode([
    "server_name" => "CodeCraft SMP",
    "online" => true,
    "players" => 20,
    "max_players" => 100
]);