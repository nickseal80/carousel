export interface Config {

    /*
     * ширина слайда (задаётся при одинаковой ширине всех слайдов)
     */
    itemWidth?: number;

    /*
     * кол-во отображаемых слайдов
     */
    visibleItemsCount?: number;

    /*
     * кнопки навигации
     */
    navButtons?: boolean;

    scrollOptions?: {

        /*
         * кол-во прокручиваемых элементов
         */
        scrollItemsCount?: number;

        /*
         * если true, то прокручиваем все видимые элементы, при этом
         * параметр scrollItemsCount игнорируется
         */
        scrollPage?: boolean;

        /*
         * тип анимации (по умолчанию "quad")
         */
        animation?: string;

        /*
         * длительность анимации (мс)
         */
        animDuration?: number;
    }
}