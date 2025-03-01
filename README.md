# Marvel info Portal

__Описание проекта__

React приложение с информацией о героях вселенной Marvel и комиксах, связанных с ними.   
Все данные подтягиваются из [Marvel API](https://developer.marvel.com/)

✅ [Ссылка на GitHub Pages](https://vishnevetskayasasha.github.io/Marvel/)   
🔥 [Макет в Figma](https://www.figma.com/design/xiC1B6ZlHvbiUK6FO3caxN/Marvel-DB?node-id=0-1&p=f)

__Функционал проекта__
* Отображение рандомного персонажа + смена по клику;
* Вывод списка персонажей (главная страница) + списка комиксов (страница Comics) + подгрузка новых карточек по клику на "load more";
* Отображение информации о персонаже по клику на него на главной странице + список комиксов с его участием;
* Отображение информации о комиксе по клику на него на странице Comics или из списка комиксов конкретного персонажа;
* Поиск персонажа по имени; 
* Отображение спиннера при загрузке данных и картинки "что-то пошло не так" при ошибке;
* Реализация страницы 404;
* Роутинг приложения;
* Реализация хука запроса на сервер.

__Технологии:__
* JavaScript ES6
* React
  * Хуки: useState, useEffect, useRef, useMemo, useCallback
* React Router
* Formik + Yup
* Helmet

__Как работать с проектом:__
1. Откройте консоль и перейдите в папку, куда хотите сохранить проект;
2. Клонируйте проект в выбранную папку `git clone https://github.com/VishnevetskayaSasha/Marvel.git`;
3. Перейдите в папку скопированного проекта и установите пакеты `npm install`;
4. Запустите сборку в режиме разработки `npm start`.

