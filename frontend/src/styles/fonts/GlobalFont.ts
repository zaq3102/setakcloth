import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    @font-face {
        font-family: "Font_Nanum1";
        src: local("Font_test"), url('assets/Fonts/NanumGothic.woff') format('woff');
    }
    @font-face {
        font-family: "Font_Nanum2";
        src: local("Font_test"), url('assets/Fonts/NanumGothicBold.woff') format('woff');
    }
    @font-face {
        font-family: "Font_Nanum3";
        src: local("Font_test"), url('assets/Fonts/NanumGothicExtraBold.woff') format('woff');
    }
    @font-face {
        font-family: "Font_Nanum4";
        src: local("Font_test"), url('assets/Fonts/NanumGothicLight.woff') format('woff');
    }
`;
