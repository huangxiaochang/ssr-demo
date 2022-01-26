/* 
给定整数数组 nums 和整数 k，请返回数组中第 k 个最大的元素。

请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。

 

示例 1:

输入: [3,2,1,5,6,4] 和 k = 2
输出: 5
示例 2:

输入: [3,2,3,1,2,4,5,5,6] 和 k = 4
输出: 4
 

提示：

1 <= k <= nums.length <= 104
-104 <= nums[i] <= 104

 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
 var findKthLargest = function(nums, k) {
   return quickSort(nums, k, 0, nums.length - 1)
};
var quickSort = function(nums, k, l , r) {
  let  target = nums[l]
   let i = l, j = r
   while (i < j) {
    if (nums[j] > target) {
      let temp = nums[j]
      nums[j] = nums[i]
      nums[i] = temp
      j--
      i++
    } else {
      j--
    }
   }
   if(i === k) {
    return nums[i-1]
   } else if(i > k) {
     return quickSort(nums, k, l, i - 1)
   } else {
     return quickSort(nums, k, i, r)
   }
}

console.log(findKthLargest([3,2,1,5,6,4], 1));