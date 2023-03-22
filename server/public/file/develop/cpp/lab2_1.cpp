#include <stdio.h>
#include <math.h>
#include <omp.h>
#include <iostream>
#include <cmath>
#include <omp.h>

int main()
{
    // int n = 100;
    // int A[n];

    // omp_set_num_threads(2);
    // for(int i = 0; i < n; i++){
    //     A[i] = i+1;
    // }

    // #pragma omp parallel for shared(A) num_threads(2)
    // for (int i = 1; i < n; i++)
    //     A[i] += A[i - 1];
        
    // for (int k = 0; k < n; k++)
    // {
    //     printf("%d,", A[k]);
    // }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // int n = 8;
    // int A[n] = {1, 2, 3, 4, 5, 6, 7, 8};
    // int reg_j;

    // #pragma omp parallel for reduction(+:reg_j)
    // for (int i = 0; i < n; i++){
    //     reg_j = A[i];
    // }
        
    // for (int i = 0; i < ceil(log(n)); i++)
    // {
    //     #pragma omp parallel for reduction(+:reg_j)
    //     for (int j = (int)pow(2, i); j < n; j++)
    //     {
    //         reg_j += A[j];
    //         A[j] = reg_j;
    //     }
    // }

    // for (int i = 0; i < n; i++)
    // {
    //     printf("%d,", A[i]);
    // }
    /////////////////////////////////////////////////////////////////////////////////////////////////////
    const int n = 16;
    const int k = 4;
    int* A = new int[n];

    // Initialize A with some data
    for (int i = 0; i < n; i++) {
        A[i] = i + 1;
    }

    // Parallel loop 1
    // 1 шат: i процессор бүр n/p = log(n) = k хэмжээтэй дэд массивийн локал
    // prefix нийлбэрийг тооцоолно
    #pragma omp parallel for shared(A) num_threads(4)
    for (int i = 0; i < n / k; i++) {
        for (int j = 1; j < k; j++) {
            A[i*k+j] += A[i*k+j-1];
        }
        // int pro = omp_get_thread_num();
        // std::cout << pro << " ";
        // for(int j=0;j<k;j++){
        }
    

    // // // Parallel loop 2   
    // for (int i = 0; i < log2(n / k); i++) {
    //   #pragma omp parallel for shared(A) num_threads(4)
    //   for (int j = pow(2, i); j < n / k; j++) {
    //     A[j*k-1] += A[(int) (j-pow(2, i))*k-1];
    //   }
    // }

    // // // Parallel loop 3
    // #pragma omp parallel for shared(A) num_threads(4)
    // for (int i = 1; i < n / k; i++) {
    //   for (int j = 0; j < k - 1; j++) {
    //     A[i*k+j] += A[i*k+j-1];
    //   }
    // }

    // // Print results
    std::cout << "Result:" << std::endl;
    for (int i = 0; i < n; i += (n/k)) {
        for(int j = i; j < i + (n/k); j++){
            std::cout << A[j] << "";
        } 
        std::cout << "\n";
    }
    std::cout << std::endl;
    delete[] A;

    return 0;
}
