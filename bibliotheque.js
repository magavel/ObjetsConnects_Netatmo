

//node est la classe qui gere tous les elements  du dom
//
/**
 *
 */
Node.prototype.drag= function(){
    let obj=this; // permet de recuperer l'objet sur lequel on pallique la methode
    obj.style.cursor="move";

    let deplace= function(x,y){
        obj.style.left= x;
        obj.style.top = y;
    }

    // on fait en sorte que l'élément à déplacer passe en premier plan. Son zindex prend alors la plus grande valeur

    var elements = document.getElementsByTagName('*'); //On récupère tous les éléments de la page
    var zIndex = 0;
    for( var i=0; i < elements.length; i++)
    {
        zIndex = Math.max(zIndex,elements[i].style.zIndex);
    }

    obj.style.zIndex = zIndex + 1;

    let move=function(ev){

        let dX=ev.clientX-parseInt(obj.style.left), dY=ev.clientY-parseInt(obj.style.top);

        let windowMousemove = function(e){deplace(e.clientX-dX+"px",e.clientY-dY+"px")};
        window.addEventListener("mousemove",windowMousemove,false);

        let objMouseup= function(){window.removeEventListener("mousemove",windowMousemove,false);};
        obj.addEventListener("mouseup",objMouseup,false);

    }
    obj.addEventListener("mousedown",move,false);

}

/**
 * retourne vrai si nbre n est un nombre
 * @param n
 * @returns {boolean}
 */
function nombre(n){
    var reg=/^[+ -]?((\d+\.?\d*)|(\d*\.?\d+))$/;
    return(reg.test(n));
}
/**
 * retourne vrai nbre entier positif
 * @param n
 * @returns {boolean}
 */
function entierPositif(n){

    return (nombre(n) && n>=0 && Math.trunc(n)==n);

}

/**
 * retourne vrai si x est pair et false si x impaire
 * @param {*} x
 */
function paire(x){
    return (entierPositif(x) && x%2==0 )

}

/**
 * qui arrondi le nbre x n chiffre après la
 * @param x
 * @param n
 * @returns {number}
 */
function arrondi1(x,n){
    let chiffre =1;
    for (let i = 1; i < n; i++){
        chiffre +='0';
    }
    x= Math.round(chiffre*x)/chiffre;
    if(nombre(x)) return x;
}

// corrige
function arrondi(x,n){
    return (Math.round(x*Math.pow(10,n))/(Math.pow(10,n)));
}


//modification du prototype de Math

// pour ajouter cette fonction à la classe Math
//Math.arrondi=function(x,n){return (Math.round(x*Math.pow(10,n)))/(Math.pow(10,n));


Number.prototype.arrondi=function(n){return (Math.round(this*Math.pow(10,n)))/(Math.pow(10,n));}



/**
 *
 * @param c
 * @param ch
 * @returns {number}
 */
function nbOccurences(c,ch){

    return ch.split(c).length-1;
}

//ecriture de la methode en objet
//String.prototype.nbOccurences=function(c){return this.split(c).length-1}
/////////////////////////////////////////////////////////////////////////////////////
/**
 * fonction nbOccurences(c,ch) qui retourne le nbre d'occurence de c dans ch
 * @param c
 * @param ch
 * @returns {number}
 */
function nbOccurencesBis(c,ch){

    let reg = new RegExp(c,'gi');
    return ch.match(reg).length;
}



//////////////////////////////////////////////////////////////////////////////




/**
 * /fonction qui renvoie  pour n la somme des n premier nbre
 * @param n
 * @returns {*}
 */
function SommePremirNbre(n){
    if(n==0)
        return 0;
    else
        return n + SommePremirNbre(n-1);

}


/**
 * Function qui retourne la surface d'un carré c
 * @param c {number}
 * @returns {number}
 */
function surfCarre(c){
    var s=c*c;
    return s;
}

/**
 * Fonction qui retourne la surface d'un rectangle
 * @param a {number}
 * @param b {number}
 * @returns {number}
 */
function surfRect(a,b){
    var s=a*b;
    return s;
}

/**
 *
 *Fonction qui retourne la surface d'un cercle
 * @param r {number}
 * @returns {number}
 */
function surfCercle(r){
    var s=Math.PI*Math.pow(r,2);
    return s;
}

/**
 * retourne le carré du nbre
 * @param n {number}
 * @returns {number}
 */
function carre(n){
    return n=n*n;
}


//////////////////////////////////////////////////////////////////
//////////:     STRING                                  //////////
//////////////////////////////////////////////////////////////////

String.prototype.left = function(n){
    return this.substring(0, n);
}

String.prototype.right = function(n){
    return this.substring(n)
}


String.prototype.capitalize =function () {
    return this.left(1).toUpperCase() +this.right(1).toLowerCase()
}

/**
 * Convertit les règles CSS border-color en borderColor
 * @returns {String}
 */
String.prototype.convertCSS = function() {
    let reg = /[-]{1}[a-z]{1}/i
    let ch = this
    while (ch.indexOf('-') != -1) {
        ch = ch.replace(reg, ch.match(reg).toString().right(1).toUpperCase())
        //c(ch)
    }
    return ch
}






//////////////////////////////////////////////////////////////////
//////////:     AJAX                                    //////////
//////////////////////////////////////////////////////////////////



/**
 *
 * @param url
 * @param data
 * @param done
 * @param error
 */

function $get(url, data, done, error){
    console.log('data '+data)
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
    let xdr = new Xhr();
    xdr.onload = function () {
        if(this.status==200){
            done(xdr)
        }else error(xdr)
    }
    data=getUrlParameter(data);
    xdr.open("GET", url+data);
    xdr.send();
}

/**
 *
 * @param url
 * @param data
 * @param done
 * @param error
 */
function $post(url, data, done, error){
    console.log(data)
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
    let xdr = new Xhr();
    xdr.onload = function () {
        if(this.status==200){
            done(xdr)
        }else error(xdr)
    }
    xdr.open("POST", url);
    xdr.send(data);
}
