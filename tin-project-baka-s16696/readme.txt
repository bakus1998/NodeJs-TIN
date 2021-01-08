Instrukcja do uruchomienia projektu "Serwis samochodowy u Stanisława":

1. Po wypakowaniu należy uruchomić projekt w np. Visual Studio
2. Uruchomić docker za pomocą komendy docker-compose up w terminalu
3. Następnie w terminalu należu uruchomić aplikację poprzez npm start (jeśli brakuje foldefu node_modules należy go pobrać)
4. Po uruchomieniu należy wejść na stronę localhost:3000

Importowanie bazy danych
1. Należy wejść na panel phpmyadmin poprzez link localhost:8183, login: root, hasło: root
2. Następnie należy stworzyć bazę o nazwie tin_project
3. Uruchomić plik z projektu tin_project.sql i jego zawartość przekopiować do nowo stworzonej bazy w opcji "SQL" oraz kliknąć wykonaj

Aplikacja wykorzystuje bibliotekę mysql2 do komunikacji z bazą.

Diagram bazy danych znajduje się w folderze projektu (nazwa Diagram_bazy_danych.png)