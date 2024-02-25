require("hardhat/config");

task("setBudget", "Set Budget of an account")
    .addParam("contract", "The `Score` contract address")
    .addParam("budget", "The budget will be update")
    .setAction(async (taskArgs, hre) => {
        const [owner] = await hre.ethers.getSigners();

        // for (const account of accounts) {
        //     console.log(account.address);
        // }
        // console.log("taskArgs =", taskArgs);
        const Score = await hre.ethers.getContractFactory("Score");
        const score = await Score.attach(taskArgs.contract);
        let budget = ethers.parseEther(taskArgs.budget);
        console.log("budget = ", ethers.formatEther(budget));
        let feeData = await ethers.provider.getFeeData();
        console.log(owner.address);
        const tx = await score.connect(owner).setBudget(owner.address, budget, {
            maxFeePerGas: feeData.maxFeePerGas,
            maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
        });
        let receipt = await tx.wait();
        console.log(receipt.transactionHash);
    });