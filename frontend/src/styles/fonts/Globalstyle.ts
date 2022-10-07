import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';

export default createGlobalStyle`
    ${reset}
    *, *::before, *::after{
        box-sizing: border-box;
    }
    html{
        font-size: 1vw;
    }
    body{
        font-family: "BMDOHYEON_ttf";
    }
    a{
        color: inherit;
        text-decoration: none;
    }
    ul{
        list-style: none;
    }
`;
