import ThirdPartyEmailPassword, { Google, Facebook,Github} from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import Session from "supertokens-auth-react/recipe/session";
import EmailVerification from "supertokens-auth-react/recipe/emailverification";


export const SuperTokensConfig = {
    appInfo: {
        appName: "Ikarus_Nest",
        apiDomain: "http://localhost:8000",
        websiteDomain: "http://localhost:3000",
    },
    // recipeList contains all the modules that you want to
    // use from SuperTokens. See the full list here: https://supertokens.com/docs/guides
    recipeList: [
        EmailVerification.init({
            mode: "OPTIONAL", // or "OPTIONAL"
          }),

        ThirdPartyEmailPassword.init({  
            getRedirectionURL: async (context) => {
                if (context.action === "SUCCESS") {
                    if (context.redirectToPath !== undefined) {
                        // we are navigating back to where the user was before they authenticated
                        return context.redirectToPath;
                    }
                    return "/";
                }
                return undefined;
            }
            ,
            signInAndUpFeature: {
                providers: [Google.init(),Facebook.init(),Github.init()],
            },

            onHandleEvent: async (context) => {
                if (context.action === "SESSION_ALREADY_EXISTS") {
                    // TODO:
                } else if (context.action === "SUCCESS") {
                    let { id, email } = context.user;
                    if (context.isNewUser) {
                        // TODO: Sign up
                    } else {
                        // TODO: Sign in
                    }
                }
            }
        }),
        Session.init(),




    ],
};
