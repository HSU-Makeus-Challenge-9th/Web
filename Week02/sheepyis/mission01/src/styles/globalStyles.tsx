import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    :root {
        --vh: 100%;
    }
    

    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, 
    a, abbr, acronym, address, big, cite, 
    del, em, strong, dfn,  img, ins, kbd, q, s, samp,
    small, strike,  sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, menu, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup,
    main, menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        border: 0;
        padding: 0;
        vertical-align: baseline;
    }
    article, aside, details, figcaption, figure,
    footer, header, hgroup, main, menu, nav, section {
        display: block;
    }
        
    *[hidden] {
        display: none;
    }

    body {
        touch-action: manipulation;
        background-size: 100%;
        background-repeat: repeat;
    }

    menu, ol, ul {
        list-style: none;
    }

    
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }

    table {
        border-collapse: collapse;
        border-spacing: 0;
    }

    * {
        box-sizing: border-box;
    } 
    
    /* 빅테스크탑 */
    html {
        font-family: var(--font-family);
        -webkit-touch-callout: none;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        scroll-behavior: smooth;
        font-size: 62.5%;
        background: lightgray;
    }
    
    @media screen and (max-width:1799px) {
        /* 데스크탑 */
        html{
            font-size: 50%;
        }
    }

    @media screen and (max-width:1199px) {
        /* 데스크탑 */
        html{
            font-size: 45%;
        }
    }

    @media screen and (max-width:991px) {
        /* 타블렛 */
        html{
            font-size: 40%;
        }
    }

    @media screen and (max-width:767px) {
        /* 모바일 */
        html{
            font-size: 30%;
        }
    }

    @media screen and (max-width:424px) {
        /* 모바일 */
        html{
            font-size: 25%;
        }
    }

    @media screen and (max-width:374px) {
        /* 모바일 */
        html{
            font-size: 20%;
        }
    }
    
    ul, li {
        padding-left: 0rem;
        list-style: none;
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    input, button {
        outline: none; 
        border: none;
        background-color: transparent;
        font-family: var(--font-family);
    }
    button {
        cursor: pointer;
        padding: 0;
    }
    input {
        appearance: none;
        
        &:focus {
            outline: none;
        }
    }

    select{
        border: none;

        &:focus {
            outline: none;
        }
    }

    .scroll::-webkit-scrollbar {
        display: none;
    }

    .scroll {
        -ms-overflow-style: none; /* 인터넷 익스플로러 */
        scrollbar-width: none; /* 파이어폭스 */
    }
`;

export default GlobalStyle;
