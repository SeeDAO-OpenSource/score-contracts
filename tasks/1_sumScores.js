require("hardhat/config");

task("sumScores", "Sum all scores")
    .addParam("input", "The input json file with accounts and amounts")
    .setAction(async (taskArgs, hre) => {
        const data = require(taskArgs.input);
        console.log(data);
        let budget = ethers.parseEther("0");
        for (var i = 0; i < data.length; i++) {
            let realAmount = ethers.parseEther(data[i].amount);
            data[i]["realAmount"] = realAmount;
            budget += realAmount;
        }
        console.log("All scores = ", ethers.formatEther(budget));
    });