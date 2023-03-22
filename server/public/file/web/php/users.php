<?php
session_start();
include "menu.php";
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
    <link rel="stylesheet" href="styles.css">
    <title>Document</title>
</head>

<body>
    <?php
    function connection()
    {
        $hostName = "localhost";
        $port = 3306;
        $dbUsername = "root";
        $dbPassword = "";
        $dbName = "user";

        $connection = mysqli_connect($hostName, $dbUsername, $dbPassword, $dbName, $port);
        if (!$connection) {
            die("data base connection failed!" . mysqli_connect_error());
        }
        return $connection;
    }
    $query = "select * from user;";
    $result = mysqli_query(connection(), $query);
    $_SESSION["users"] = mysqli_fetch_all($result);
    ?>
    <div class="container">
        <h2>Users</h2>
        <table class="table table-striped">
            <thead>
                <tr>
                    <td>Id</td>
                    <td>Email</td>
                    <td>Username</td>
                    <td>Password</td>
                </tr>
            </thead>
            <tbody>
                <?php
                $users = $_SESSION["users"];
                foreach ($users as $index => $user) {
                ?>
                    <tr>
                        <td> <?php print_r($user[0]) ?></td>
                        <td><?php print_r($user[1]) ?></td>
                        <td><?php print_r($user[2]) ?></td>
                        <td><?php print_r($user[3]) ?></td>
                    </tr>
                <?php } ?>
            </tbody>
        </table>
    </div>
</body>

</html>