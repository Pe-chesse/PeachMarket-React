import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
    ${reset};
    * {
        font-family: 'IBM Plex Sans KR', sans-serif;
    };
    body{
        padding: 0;
        margin: 0;
        font-family: 'IBM Plex Sans KR', sans-serif;
        overflow: hidden;
        box-sizing: border-box;
    };
    button{
        display: flex;
        cursor: pointer;
        outline: none;
        border-radius: 3px;
    };
    input{
        display: flex;
        outline: none;
        padding-left: 10px;
    }
    a{
        text-decoration: none;
        color: #333;
        font-weight: bold;
    }
    .top-area {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 15px;
        margin-bottom: 6px;
        border-bottom: 1px solid #dbdbdb;
    }
    
`;


export default GlobalStyle;