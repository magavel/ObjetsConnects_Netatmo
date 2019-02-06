

function $get(url, data, done, error){
    function getUrlParameter(data) {
        let result = new Array();
        let param='';
        let temp = new Date().getTime();
        param='?';
        for (var prop in data){
            param+=prop;
            param+='='
            param+=encodeURIComponent(data[prop]);
            param+='&';
        }
        param+=temp;
        //console.log(param)
        return param;

    }
    function Xhr(){
        let xhr = null;
        if(window.XDomainRequest){
            xhr = new XDomainRequest();
        } else if (window.XMLHttpRequest){
            xhr = new XMLHttpRequest();
        } else {
            alert("Veuillez mettre à jour votre navigateur");
        }
        return xhr;
    }
    let xdr = new Xhr();
    xdr.onload = function () {
        if(this.status==200){
            done(xdr)
        }else error(xdr)
    }
    data=getUrlParameter(data);
    xdr.open("GET", url+data);
    //console.log(data);
    xdr.send();
}


function $post(url, data, done, error){
    function getUrlParameter(data) {
        let result = new Array();
        let param='';
        let temp = new Date().getTime();
        param='?';
        for (var prop in data){
            param+=prop;
            param+='='
            param+=encodeURIComponent(data[prop]);
            param+='&';
        }
        param+=temp;
        return param;

    }
    function Xhr(){
        let xhr = null;
        if(window.XDomainRequest){
            xhr = new XDomainRequest();
        } else if (window.XMLHttpRequest){
            xhr = new XMLHttpRequest();
        } else {
            alert("Veuillez mettre à jour votre navigateur");
        }
        return xhr;
    }
    data=getUrlParameter(data);
    console.log(data)
    let xdr = new Xhr();
    xdr.onload = function () {
        if(this.status==200){
            done(xdr)
        }else error(xdr)
    }
    xdr.open("POST", url);
    xdr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    //console.log(url)
    xdr.send(data);
}


