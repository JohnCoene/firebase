"use strict";(self.webpackChunkfirebase_r=self.webpackChunkfirebase_r||[]).push([[199],{471:(e,s,n)=>{n(235);var r=n(774),i=n(118);let c=[];Shiny.addCustomMessageHandler("fireblaze-set-oauth-provider",(e=>{c[e.id]=new i.O4(e.provider),Object.entries(e.opts).length>0&&c[e.id].setCustomParameters(e.opts)})),Shiny.addCustomMessageHandler("fireblaze-oauth-sign-in-popup",(e=>{const s=(0,i.v0)();(0,i.rh)(s,c[e.id]).then((s=>{if(e.credentials){const e=i.O4.credentialFromResult(s);s.credentials={idToken:e.idToken,accessToken:e.accessToken}}(0,r.H9)("signed_up_user",{success:!0,response:s},e.ns)})).catch((s=>{(0,r.H9)("signed_up_user",{success:!1,response:s},e.ns)}))})),Shiny.addCustomMessageHandler("fireblaze-oauth-sign-in-redirect",(e=>{const s=(0,i.v0)();(0,i.F6)(s,c[e.id]),(0,i.cx)().then((s=>{if(e.credentials){const e=i.O4.credentialFromResult(s);s.credentials={idToken:e.idToken,accessToken:e.accessToken}}(0,r.H9)("signed_up_user",{success:!0,response:s},e.ns)})).catch((s=>{(0,r.H9)("signed_up_user",{success:!1,response:s},e.ns)}))}))}},e=>{e.O(0,[818,647],(()=>(471,e(e.s=471)))),e.O()}]);