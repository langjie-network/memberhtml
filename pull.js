M=require("ming_node");


async function main(){
    M.get("http://114.55.104.101:60000/gitpull").then(d=>{
        console.log("<=====",d)
    })
}

main();