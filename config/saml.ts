import fs from 'fs'

export const reciterSamlConfig = {

    saml_options: {
        entity_id: "https://reciter-dev.weill.cornell.edu",
        private_key: fs.readFileSync(process.cwd() + "/config/certs/reciter-saml.key").toString(),
        certificate: fs.readFileSync(process.cwd() + "/config/certs/reciter-saml.crt").toString(),
        assert_endpoint: "https://reciter-dev.weill.cornell.edu/api/auth/callback/saml",
        force_authn: true,
        auth_context: { comparison: "exact", class_refs: ["urn:oasis:names:tc:SAML:1.0:am:password"] },
        nameid_format: "urn:oasis:names:tc:SAML:2.0:nameid-format:transient",
        sign_get_request: true,
        allow_unencrypted_assertion: false
    },

    saml_idp_options: {
        sso_login_url: "https://login-proxy-test.weill.cornell.edu/idp/profile/SAML2/Redirect/SSO",
        sso_logout_url: "https://login-proxy-test.weill.cornell.edu/idp/profile/SAML2/Redirect/SLO",
        certificates: [
            fs.readFileSync(process.cwd() + "/config/certs/idp.crt").toString()
        ],
        force_authn: true,
        sign_get_request: true,
        allow_unencrypted_assertion: false
    }
}