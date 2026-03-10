const cards = document.querySelectorAll(".card")
const modeSelect = document.getElementById("mode")

function updateClocks(){

    cards.forEach(card=>{

        const zone = card.dataset.zone

        const now = new Date(
            new Date().toLocaleString("en-US",{timeZone:zone})
        )

        const h = now.getHours()
        const m = now.getMinutes()
        const s = now.getSeconds()

        const digital = card.querySelector(".digital")
        const dateDiv = card.querySelector(".date")

        digital.innerText =
            String(h).padStart(2,'0')+" : "+
            String(m).padStart(2,'0')+" : "+
            String(s).padStart(2,'0')

        const dateString = now.toLocaleDateString("en-US",{
            weekday:"long",
            year:"numeric",
            month:"long",
            day:"numeric"
        })

        dateDiv.innerText = dateString

        drawClock(card.querySelector("canvas"),h,m,s)

    })

}

function drawClock(canvas,h,m,s){

    const ctx = canvas.getContext("2d")

    const r = canvas.width/2

    ctx.setTransform(1,0,0,1,0,0)
    ctx.clearRect(0,0,canvas.width,canvas.height)

    ctx.translate(r,r)

    drawFace(ctx,r)

    drawNumbers(ctx,r)

    drawHands(ctx,r,h,m,s)

    ctx.translate(-r,-r)

}

function drawFace(ctx,r){

    ctx.beginPath()

    ctx.arc(0,0,r-5,0,Math.PI*2)

    ctx.fillStyle="white"

    ctx.fill()

    ctx.lineWidth=5

    ctx.strokeStyle="#5f7cff"

    ctx.stroke()

}

function drawNumbers(ctx,r){

    ctx.font=r*0.15+"px Arial"

    ctx.textBaseline="middle"
    ctx.textAlign="center"

    for(let num=1;num<=12;num++){

        let ang=num*Math.PI/6

        ctx.rotate(ang)

        ctx.translate(0,-r*0.8)

        ctx.rotate(-ang)

        ctx.fillStyle="#5b7cff"

        ctx.fillText(num,0,0)

        ctx.rotate(ang)

        ctx.translate(0,r*0.8)

        ctx.rotate(-ang)

    }

}

function drawHands(ctx,r,h,m,s){

    let hour=((h%12)*Math.PI/6)+(m*Math.PI/(6*60))

    drawHand(ctx,hour,r*0.5,6,"#333")
    let minute=(m*Math.PI/30)

    drawHand(ctx,minute,r*0.75,4,"#333")
    let second=(s*Math.PI/30)

    drawHand(ctx,second,r*0.85,2,"#ff4d4f")
}

function drawHand(ctx,pos,len,width,color="black"){

    ctx.beginPath()

    ctx.lineWidth=width

    ctx.strokeStyle=color

    ctx.moveTo(0,0)

    ctx.rotate(pos)

    ctx.lineTo(0,-len)

    ctx.stroke()

    ctx.rotate(-pos)

}

modeSelect.addEventListener("change",()=>{

    const mode=modeSelect.value

    cards.forEach(card=>{

        const digital=card.querySelector(".digital")
        const canvas=card.querySelector("canvas")

        if(mode==="digital"){

            digital.style.display="block"
            canvas.style.display="none"

        }

        else if(mode==="analog"){

            digital.style.display="none"
            canvas.style.display="block"

        }

        else{

            digital.style.display="block"
            canvas.style.display="block"

        }

    })

})

function animateClock(){

    updateClocks()

    requestAnimationFrame(animateClock)

}

animateClock()

updateClocks()

