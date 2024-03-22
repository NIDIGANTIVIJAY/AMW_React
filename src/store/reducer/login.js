import Type from "../type"

const initialState = {
    loginDetails: false,
    login: false,
    token: false,
}
const LoginReducer = (state = initialState, action) => {

    console.log(action.type,"lk");


    switch (action.type) {

        case Type.USER:
            return {
                ...state,
                loginDetails: action.payload
            }

        case Type.LOGIN:
            console.log(state,action.payload, "14247");

            return {
                ...state,
                login: action.payload,
            };

        case Type.TOKEN:
            console.log(action.payload, "Token");
            return {
                ...state,
                token: action.payload
            }




        default:
            return state

    }


}

export default LoginReducer