
<!DOCTYPE html>
<html lang="ru">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Dev_test</title>
	<link rel="icon" href="./assets/images/favicon.ico">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
	<link rel="stylesheet" href="./assets/style/foundation.css">
	<link rel="stylesheet" href="./assets/style/main.css">
</head>
<body>
	<div class="page bootstrap-wrapper">
		<div class="wrapper">
            <!-- HEADER -->
            <? include "./blocks/header.php" ?>

            <!-- BODY -->
            <section class="form-section">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col col-auto">
                            <div class="form-section__logo">
                                <img class="form-section__logo-image" src="./assets/images/mess.png" alt="form-logo">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col d-flex justify-content-center">
                            <form class="form" name="addComment">
                                <div class="row justify-content-between">
                                    <div class="col-sm d-flex flex-column justify-content-start">
                                        <label class="label form__label">
                                            <span class="form__subtitle">Имя</span>
                                            <input type="text" name="name" class="input" required minlength="2">
                                        </label>
                                        <label class="label form__label">
                                            <span class="form__subtitle">E-Mail</span>
                                            <input type="email" name="email" class="input" required>
                                        </label>
                                    </div>
                                    <div class="col-sm">
                                        <label class="label form__label">
                                            <span class="form__subtitle">Комментарий</span>
                                            <textarea class="textarea form__textarea" name="text" required minlength="2"></textarea>
                                        </label>
                                    </div>
                                </div>
                                <div class="row justify-content-center">
                                    <div class="col col-auto">
                                        <span class="status"></span>
                                    </div>
                                </div>
                                <div class="row justify-content-md-end justify-content-start">
                                    <div class="col col-auto">
                                        <button class="btn form__submit" type="button">Записать</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <section class="comments-section">
                <div class="container">
                    <div class="row">
                        <div class="col">
                            <h3 class="comments-section__title title">Выводим комментарии</h3>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col d-flex flex-wrap justify-content-center">
                            <ul class="comments">
                                <!-- Место вставки комментариев -->
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
		</div>

		<!-- FOOTER -->
		<? include "./blocks/footer.php" ?>
	</div>
	<script src="./assets/scripts/main.js"></script>
</body>
</html>