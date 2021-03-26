var canPartition = function (nums) {
  let sum = 0;
  for (let num of nums) sum += num;
  // 和为奇数时，不可能划分成两个和相等的集合
  if (sum % 2 != 0) return false;
  let n = nums.length;
  sum = sum / 2;
  let dp = new Array(n+1)
  for (let i = 0; i <=n;i++) {
    dp[i] = new Array(n+1).fill(false)
  }
  // console.log(dp, '-0--')
  // return
  for (let i = 0; i <= n; i++)
    dp[i][0] = true;

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= sum; j++) {
      if (j - nums[i - 1] < 0) {
        // 背包容量不足，不能装入第 i 个物品
        dp[i][j] = dp[i - 1][j];
      } else {
        // 装入或不装入背包
        dp[i][j] = dp[i - 1][j] | dp[i - 1][j - nums[i - 1]];
      }
    }
  }
  return dp[n][sum];
};
console.log(canPartition([1,5,11,5]))
var canPartition = function (nums) {
  let n = nums.length;
  let sum = nums.reduce((acc, num) => acc + num, 0);
  if (sum % 2) {
    return false;
  } else {
    sum = sum / 2;
  }
  
  const dp = Array.from(nums).map(() =>
    Array.from({ length: sum + 1 }).fill(false)
  );
  for (let i = 0; i < nums.length; i++) {
    dp[i][0] = true;
  }

  for (let i = 0; i < dp.length - 1; i++) {
    for (let j = 0; j < dp[0].length; j++) {
      dp[i + 1][j] = j - nums[i] >= 0 ? dp[i][j] || dp[i][j - nums[i]] : dp[i][j];
    }
  }  
  return dp[nums.length - 1][sum];
  // for (let i = 1; i <= n; i++) {
  //   for (let j = 1; j <= sum; j++) {
  //     if (j - nums[i - 1] < 0) {
  //       // 背包容量不足，不能装入第 i 个物品
  //         dp[i][j] = dp[i - 1][j]; 
  //     } else {
  //         // 装入或不装入背包
  //         dp[i][j] = dp[i - 1][j] | dp[i - 1][j-nums[i-1]];
  //     }
  //     }
  // }
  // return dp[n][sum];
};
