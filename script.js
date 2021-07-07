(function () {
    var canvas = document.getElementById('background-canvas') ,
        ctx = canvas.getContext('2d'),
        w = canvas.width = innerWidth,
        h = canvas.height = innerHeight,
        particles = [],
        properties = {
            bgColor: 'rgba(17, 17, 19, 1)',
            particleColor: 'rgba(0, 15, 226, 1)',
            particleRadius: 3,
            particleCount: 90,
            particleMaxVelocity: 0.5,
            lineLength: 150,
            particleLife : 15
        };
    
     
    window.onresize = function () {
        w = canvas.width = innerWidth,
        h = canvas.height = innerHeight;
    }

    class Particle{
        constructor() {
            this.x = Math.random()*w;
            this.y = Math.random() * h;
            this.velocityX = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
            this.velocityY = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
            this.life = Math.random() * properties.particleLife * 60;
        }
        position() {
            this.x + this.velocityX > w && this.velocityX > 0 || this.x + this.velocityX < 0 && this.velocityX < 0 ? this.velocityX *= -1 : this.velocityX;
            this.x + this.velocityY > h && this.velocityY > 0 || this.y + this.velocityY < 0 && this.velocityY < 0 ? this.velocityY *= -1 : this.velocityY;
            this.x +=  this.velocityX;
            this.y +=  this.velocityY;
        }
        reDraw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, properties.particleRadius, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fillStyle = properties.particleColor;
            ctx.fill();
        }
        reCalculateLife() {
            if (this.life < 1) {
                this.x = Math.random()*w;
                this.y = Math.random() * h;
                this.velocityX = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
                this.velocityY = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
                this.life = Math.random() * properties.particleLife * 60;  
            }
            this.life--;
        }
    }

    function reDrawBackground() {
        ctx.fillStyle = properties.bgColor;
        ctx.fillRect(0, 0, w, h);
    }

    function drawLines() {
        var x1, y1, x2, y2, length, opacity;
        for (var i in particles) {
            for (var j in particles) {
                x1 = particles[i].x;
                y1 = particles[i].y;
                x2 = particles[j].x;
                y2 = particles[j].y;
                length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                if (length < properties.lineLength) {
                    opacity = 1 - length / properties.lineLength;
                    ctx.lineWidth = '0.5';
                    ctx.strokeStyle = 'rgba(0, 15, 226, '+opacity+')';
                    ctx.beginPath();
                    ctx.moveTo(x1, y1);
                    ctx.lineTo(x2, y2);
                    ctx.closePath();
                    ctx.stroke();
                }
            }
        }
    }
    function reDrawParticles() {
        for (var i in particles) {

            particles[i].reCalculateLife();
            particles[i].position();
            particles[i].reDraw();
        }
    }  
    function loop() {
        reDrawBackground();
        reDrawParticles();
        drawLines();
        requestAnimationFrame(loop);
    }

    function init() {
        for(var i = 0 ; i < properties.particleCount ; i++){
            particles.push(new Particle);
        }
        loop();
    }

    init();

  }())
// ----------------Progress bar----------------------
$(function () {
  $(window).on("scroll resize", function () {
    var o = $(window).scrollTop() / ($(document).height() - $(window).height());
      $(".progress-bar").css({
        "width": (100 * o | 0) + "%"
        });
          $('progress')[0].value = o;
      })
});
// ----------------Toast Onload----------------------
var options = 
{
  animation: true,
  delay: 15000
};
function Toasty( )
{
  var toastHTMLElement = document.getElementById( "EpicToast" );
  var toastElement = new bootstrap.Toast( toastHTMLElement, options );
  toastElement.show();
}
window.onload = Toasty;

