AFRAME.registerComponent("enemy-bullets", {
    init: function () {
        setInterval(this.shootEnemyBullet, 2000)
    },
    shootEnemyBullet: function () {
        var els = document.querySelector(".enemy")
        console.log(els)
        for(var i = 0;i<els.length;i++){
            var enemy_bullet = document.createElement("a-entity")
            enemy_bullet.setAttribute("geometry",{
                primitive:"sphere",
                radius:0.1
            })
            enemy_bullet.setAttribute("material", "color","#282b29")
            var position = els[i].getAttribute("position")
            enemy_bullet.setAttribute("position", {
                x:position.x+1.5,
                y:position.y+3.5,
                z:position.z
            })
            var scene = document.querySelector("#scene")
            scene.appendChild(enemy_bullet)
            var enemy = els[i].object3D
            var player = document.querySelector("#weapon").object3D
            var position1 = new THREE.Vector3()
            var position2 = new THREE.Vector3()
            player.getWorldPosition(position1)
            enemy.getWorldPosition(position2)
            var direction = new THREE.Vector3()
            direction.subVectors(position1,position2).normalize()
            enemy_bullet.setAttribute("velocity", direction.multiplyScalar(10))
            enemy_bullet.setAttribute("dynamic-body",{
                shape:"sphere",
                mass:0
            })
            var element = document.querySelector("#countLife")
            var player_life= parseInt(element.getAttribute("text").value)
            enemy_bullet.addEventListener("collide", function(e){
                if(e.detail.body.el.id == "weapon"){
                    if(player_life>0){
                        player_life-=1
                        element.setAttribute("text",{value:player_life})
                    }
                    if(player_life<=0){
                        var txt = document.querySelector("#over")
                        txt.setAttribute("visible", true)
                        var tank_el = document.querySelectorAll(".enemy")
                        for(var i = 0;i < tank_el.length;i++){
                            scene.removeChild(tank_el[i])
                        } 
                    }
                }
            })
        }
    },

});