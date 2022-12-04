//API History
class Historial{
    constructor(){

    }
    goBack(){
         window.history.back();
    }
    goForward(){
        window.history.forward();
    }
}
//API Canvas -> https://www.javascripttutorial.net/web-apis/javascript-canvas/
class Pacman{
    constructor(){
    }

    // A utility function to draw a rectangle with rounded corners.
      
    roundedRect(ctx, x, y, width, height, radius) {
        ctx.strokeStyle = "#0026ff";
        ctx.beginPath();
        ctx.moveTo(x, y + radius);
        ctx.arcTo(x, y + height, x + radius, y + height, radius);
        ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius);
        ctx.arcTo(x + width, y, x + width - radius, y, radius);
        ctx.arcTo(x, y, x, y + radius, radius);
        ctx.stroke();
    }

    createPacman() {
        const canvas = document.querySelector('canvas');
        if (canvas.getContext) {
          const ctx = canvas.getContext('2d');
          
          
          this.roundedRect(ctx, 12, 12, 200, 200, 15);
          this.roundedRect(ctx, 19, 19, 186, 186, 9);
          this.roundedRect(ctx, 53, 53, 49, 33, 10);
          this.roundedRect(ctx, 53, 119, 49, 16, 6);
          this.roundedRect(ctx, 135, 53, 49, 33, 10);
          this.roundedRect(ctx, 135, 119, 25, 49, 10);
            
          ctx.fillStyle = 'yellow';
          ctx.beginPath();
          ctx.arc(37, 37, 13, Math.PI / 7, -Math.PI / 7, false);
          ctx.lineTo(31, 37);
          ctx.fill();
      
          ctx.fillStyle = 'orange';
          for (let i = 0; i < 10; i++) {
            ctx.fillRect(51 + i * 16, 35, 4, 4);
          }
      
          for (let i = 0; i < 10; i++) {
            ctx.fillRect(115, 51 + i * 16, 4, 4);
          }
          
          for (let i = 0; i < 10; i++) {
            ctx.fillRect(51 + i * 16, 99, 4, 4);
          }
          
          ctx.fillStyle = 'red';
          ctx.beginPath();
          ctx.moveTo(83, 116);
          ctx.lineTo(83, 102);
          ctx.bezierCurveTo(83, 94, 89, 88, 97, 88);
          ctx.bezierCurveTo(105, 88, 111, 94, 111, 102);
          ctx.lineTo(111, 116);
          ctx.lineTo(106.333, 111.333);
          ctx.lineTo(101.666, 116);
          ctx.lineTo(97, 111.333);
          ctx.lineTo(92.333, 116);
          ctx.lineTo(87.666, 111.333);
          ctx.lineTo(83, 116);
          ctx.fill();
      
          ctx.fillStyle = 'white';
          ctx.beginPath();
          ctx.moveTo(91, 96);
          ctx.bezierCurveTo(88, 96, 87, 99, 87, 101);
          ctx.bezierCurveTo(87, 103, 88, 106, 91, 106);
          ctx.bezierCurveTo(94, 106, 95, 103, 95, 101);
          ctx.bezierCurveTo(95, 99, 94, 96, 91, 96);
          ctx.moveTo(103, 96);
          ctx.bezierCurveTo(100, 96, 99, 99, 99, 101);
          ctx.bezierCurveTo(99, 103, 100, 106, 103, 106);
          ctx.bezierCurveTo(106, 106, 107, 103, 107, 101);
          ctx.bezierCurveTo(107, 99, 106, 96, 103, 96);
          ctx.fill();
      
          ctx.fillStyle = 'black';
          ctx.beginPath();
          ctx.arc(101, 102, 2, 0, Math.PI * 2, true);
          ctx.fill();
          
          ctx.beginPath();
          ctx.arc(89, 102, 2, 0, Math.PI * 2, true);
          ctx.fill();
        }
    }
}

class FullScreen{
    constructor(){

    }
    pantallaCompleta(){
        /* Get the element you want to display in fullscreen */
        var elem = document.querySelector("#canvas");

        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) { /* Safari */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE11 */
            elem.msRequestFullscreen();
        }
    }
}

var historial = new Historial();
var pac = new Pacman();
var pantalla = new FullScreen();

