"use strict";(self.webpackChunkfirebase_r=self.webpackChunkfirebase_r||[]).push([[214],{44:(e,s,n)=>{n(235);var c,a,r=n(774),i=n(118);Shiny.addCustomMessageHandler("fireblaze-phone-verify",(e=>{const s=(0,i.v0)();a||(a="firebase-recaptcha"==e.id?new i.lI(e.id,{callback:s=>{(0,r.H9)("phone_recaptcha",s,e.ns)}},s):new i.lI(e.id,{size:"invisible",callback:s=>{(0,r.H9)("phone_recaptcha",s,e.ns)}},s)),(0,i.$g)(s,e.number,a).then((s=>{c=s,(0,r.H9)("phone_verification",{success:!0,response:s},e.ns)})).catch((s=>{a.render().then((function(e){grecaptcha.reset(e)})),(0,r.H9)("phone_verification",{success:!1,response:s},e.ns)}))})),Shiny.addCustomMessageHandler("fireblaze-phone-confirm",(e=>{c&&c.confirm(e.code).then((s=>{(0,r.H9)("phone_confirmation",{success:!0,response:s},e.ns)})).catch((s=>{(0,r.H9)("phone_confirmation",{success:!1,response:s},e.ns)}))}))}},e=>{e.O(0,[818,647],(()=>(44,e(e.s=44)))),e.O()}]);