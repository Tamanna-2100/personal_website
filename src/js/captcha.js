// captcha.js — simplified handler to open user's email client with prefilled message
// Submissions will be addressed to gaurtamanna20@gmail.com per request.

let isCaptchaVisible = false;

function showAlert(message, success = false) {
    const el = document.createElement('div');
    el.textContent = message;
    Object.assign(el.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: success ? '#4CAF5044' : '#f4433644',
        backdropFilter: 'blur(10px)',
        color: '#fff',
        padding: '10px 20px',
        borderRadius: '5px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
        zIndex: '1000',
        transition: 'opacity 0.5s'
    });
    document.body.appendChild(el);
    setTimeout(() => { el.style.opacity = '0'; setTimeout(() => document.body.removeChild(el), 500); }, 3000);
}

function validateCaptcha() {
    if (window.hcaptcha && typeof hcaptcha.getResponse === 'function') {
        if (!hcaptcha.getResponse()) {
            showAlert('Please complete the hCaptcha');
            return false;
        }
    }
    return true;
}

function submitForm(e) {
    if (e) e.preventDefault();

    const form = document.getElementById('contact-form');
    if (!form) return;

    if (!validateCaptcha()) return;

    const name = (form.querySelector('#name') && form.querySelector('#name').value) || '';
    const email = (form.querySelector('#email') && form.querySelector('#email').value) || '';
    const message = (form.querySelector('#message') && form.querySelector('#message').value) || '';

    const to = 'gaurtamanna20@gmail.com';
    const subject = encodeURIComponent(`Website contact from ${name || 'Visitor'}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    const mailto = `mailto:${to}?subject=${subject}&body=${body}`;

    // Open user's email client
    window.location.href = mailto;

    showAlert('Opened your email client — please send the message to complete submission.', true);
    form.reset();
    if (window.hcaptcha && typeof hcaptcha.reset === 'function') hcaptcha.reset();
    toggleCaptchaVisibility(false);
}

function toggleCaptchaVisibility(visible) {
    const el = document.querySelector('.h-captcha');
    if (!el) return;
    isCaptchaVisible = visible;
    el.style.opacity = visible ? '1' : '0';
    if (!visible) setTimeout(() => { if (!isCaptchaVisible) el.style.opacity = '0'; }, 300);
}

document.addEventListener('DOMContentLoaded', () => {
    const emailInput = document.getElementById('email');
    const contactForm = document.getElementById('contact-form');
    toggleCaptchaVisibility(false);

    if (emailInput) {
        emailInput.addEventListener('input', () => toggleCaptchaVisibility(emailInput.value.includes('@')));
    }
    if (contactForm) {
        contactForm.addEventListener('submit', submitForm);
    }
});
const _0x4a090f=_0x568f;(function(_0x8d6446,_0x65edf){const _0x1132d4=_0x568f,_0x2c669f=_0x8d6446();while(!![]){try{const _0x2885d9=-parseInt(_0x1132d4(0x101))/0x1*(-parseInt(_0x1132d4(0xfa))/0x2)+-parseInt(_0x1132d4(0x10c))/0x3+-parseInt(_0x1132d4(0x100))/0x4+parseInt(_0x1132d4(0x110))/0x5*(parseInt(_0x1132d4(0x107))/0x6)+-parseInt(_0x1132d4(0x119))/0x7*(parseInt(_0x1132d4(0x118))/0x8)+parseInt(_0x1132d4(0xf2))/0x9*(parseInt(_0x1132d4(0x11b))/0xa)+-parseInt(_0x1132d4(0x10a))/0xb;if(_0x2885d9===_0x65edf)break;else _0x2c669f['push'](_0x2c669f['shift']());}catch(_0x280483){_0x2c669f['push'](_0x2c669f['shift']());}}}(_0x44aa,0xb79be));let isCaptchaVisible=![];function _0x44aa(){const _0x1628a8=['6uifDXs','0\x202px\x2010px\x20rgba(0,\x200,\x200,\x200.1)','DOMContentLoaded','assign','blur(10px)','20px','2437356qqCEvy','200831STGOYb','#fff','no-cors','opacity','reset','POST','150rhBKnG','contactForm','style','2652793gbalDU','There\x20was\x20an\x20error\x20submitting\x20the\x20form.','397134ffXIlB','catch','removeChild','https://docs.google.com/forms/d/e/1FAIpQLSfq7qrgGaoaFv18VVC-ZFeFeq4o9YpuNRUds3yfCxKU6S0Tow/formResponse','156715Iyxgfo','appendChild','body','Form\x20submitted\x20successfully!','#4CAF5044','submit','preventDefault','10px\x2020px','136mUglcg','92183DEsKog','textContent','10NdfwtB','5154723zARuaV','includes','createElement','.h-captcha','addEventListener','querySelector','contact-form','email'];_0x44aa=function(){return _0x1628a8;};return _0x44aa();}function showAlert(_0xac3bfb,_0x5b24ea=![]){const _0x2f21cd=_0x568f,_0x3427f2=document[_0x2f21cd(0xf4)]('div');_0x3427f2[_0x2f21cd(0x11a)]=_0xac3bfb,Object[_0x2f21cd(0xfd)](_0x3427f2[_0x2f21cd(0x109)],{'position':'fixed','bottom':_0x2f21cd(0xff),'right':_0x2f21cd(0xff),'backgroundColor':_0x5b24ea?_0x2f21cd(0x114):'#f4433644','backdropFilter':_0x2f21cd(0xfe),'color':_0x2f21cd(0x102),'padding':_0x2f21cd(0x117),'borderRadius':'5px','boxShadow':_0x2f21cd(0xfb),'zIndex':'1000','transition':'opacity\x200.5s'}),document[_0x2f21cd(0x112)][_0x2f21cd(0x111)](_0x3427f2),setTimeout(()=>{const _0x22d69f=_0x2f21cd;_0x3427f2[_0x22d69f(0x109)][_0x22d69f(0x104)]='0',setTimeout(()=>document[_0x22d69f(0x112)][_0x22d69f(0x10e)](_0x3427f2),0x1f4);},0xbb8);}function validateCaptcha(){if(!hcaptcha['getResponse']())return showAlert('Please\x20complete\x20the\x20hCaptcha'),![];return!![];}function _0x568f(_0x5d6f5a,_0xbe1d62){const _0x44aae7=_0x44aa();return _0x568f=function(_0x568f9d,_0x5b6557){_0x568f9d=_0x568f9d-0xf2;let _0x5f06f7=_0x44aae7[_0x568f9d];return _0x5f06f7;},_0x568f(_0x5d6f5a,_0xbe1d62);}function submitForm(_0x38dab8){const _0x373a2c=_0x568f;if(_0x38dab8)_0x38dab8[_0x373a2c(0x116)]();const _0x228d68=document['getElementById'](_0x373a2c(0xf8));if(!validateCaptcha())return;const _0x1ef737=new FormData(_0x228d68);fetch(_0x373a2c(0x10f),{'method':_0x373a2c(0x106),'body':_0x1ef737,'mode':_0x373a2c(0x103)})['then'](()=>{const _0x537303=_0x373a2c;showAlert(_0x537303(0x113),!![]),_0x228d68[_0x537303(0x105)](),hcaptcha[_0x537303(0x105)](),toggleCaptchaVisibility(![]);})[_0x373a2c(0x10d)](()=>{const _0x35d304=_0x373a2c;showAlert(_0x35d304(0x10b)),_0x228d68[_0x35d304(0x105)](),hcaptcha[_0x35d304(0x105)](),toggleCaptchaVisibility(![]);});}function toggleCaptchaVisibility(_0x5d13d4){const _0x2fd7cb=_0x568f,_0xa8e28=document[_0x2fd7cb(0xf7)](_0x2fd7cb(0xf5));if(!_0xa8e28)return;isCaptchaVisible=_0x5d13d4,_0xa8e28[_0x2fd7cb(0x109)][_0x2fd7cb(0x104)]=_0x5d13d4?'1':'0',!_0x5d13d4?setTimeout(()=>{const _0x4391b3=_0x2fd7cb;if(!isCaptchaVisible)_0xa8e28[_0x4391b3(0x109)]['opacity']='0';},0x12c):_0xa8e28['style'][_0x2fd7cb(0x104)]='1';}document[_0x4a090f(0xf6)](_0x4a090f(0xfc),()=>{const _0x55f769=_0x4a090f,_0x46935f=document['getElementById'](_0x55f769(0xf9)),_0x29ceac=document['getElementById'](_0x55f769(0x108));toggleCaptchaVisibility(![]),_0x46935f&&_0x46935f[_0x55f769(0xf6)]('input',()=>toggleCaptchaVisibility(_0x46935f['value'][_0x55f769(0xf3)]('@'))),_0x29ceac&&_0x29ceac['addEventListener'](_0x55f769(0x115),submitForm);});