<!doctype html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <title>Message Board</title>
    <meta id="_token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="{{elixir("css/main.css")}}">
</head>
<body>
<div class="container" id='app'></div>
<script src="{{ elixir("js/all.js") }}"></script>
</body>
</html>
