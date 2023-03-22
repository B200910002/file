// #include <iostream>
// #include <vector>
// #include <thread>
// #include <mutex>

// using namespace std;

// struct Node {
//     int data;
//     Node* next;
// };

// void countSort(Node* head, int start, int end, vector<int>& counts, mutex& mtx) {
//     Node* cur = head;
//     int i = 0;
//     while (cur && i < start) {
//         cur = cur->next;
//         i++;
//     }
//     while (cur && i <= end) {
//         mtx.lock();
//         counts[cur->data]++;
//         mtx.unlock();
//         cur = cur->next;
//         i++;
//     }
// }

// void mergeCounts(vector<int>& counts, vector<int>& result) {
//     for (int i = 0; i < counts.size(); i++) {
//         result[i] += counts[i];
//     }
// }

// void countSortParallel(Node* head) {
//     const int numThreads = 4;
//     vector<thread> threads(numThreads);
//     vector<vector<int>> subCounts(numThreads, vector<int>(1001, 0));
//     vector<int> counts(1001, 0);
//     mutex mtx;
//     int len = 0;
//     Node* cur = head;
//     while (cur) {
//         len++;
//         cur = cur->next;
//     }
//     int blockSize = len / numThreads;
//     int start = 0, end = blockSize - 1;
//     for (int i = 0; i < numThreads; i++) {
//         if (i == numThreads - 1) {
//             end = len - 1;
//         }
//         threads[i] = thread(countSort, head, start, end, ref(subCounts[i]), ref(mtx));
//         start += blockSize;
//         end += blockSize;
//     }
//     for (int i = 0; i < numThreads; i++) {
//         threads[i].join();
//     }
//     for (int i = 0; i < numThreads; i++) {
//         mergeCounts(subCounts[i], counts);
//     }
//     cur = head;
//     int i = 0;
//     while (cur) {
//         while (counts[i] == 0) i++;
//         cur->data = i;
//         counts[i]--;
//         cur = cur->next;
//     }
// }

// int main() {
//     Node* head = new Node{2, new Node{5, new Node{1, new Node{8, nullptr}}}};
//     countSortParallel(head);
//     Node* cur = head;
//     while (cur) {
//         cout << cur->data << " ";
//         cur = cur->next;
//     }
//     cout << endl;
//     return 0;
// }

#include <iostream>
#include <vector>
#include <thread>
#include <mutex>


using namespace std;

struct Node
{
    int data;
    Node *next;
};

void countSort(Node *head, int start, int end, vector<int> &counts, mutex &mtx, const string &threadName, chrono::microseconds &totalComputationTime, chrono::microseconds &transferTime, int& dataTransferSize)
{
    Node *cur = head;
    int i = 0;
    auto computationStartTime = chrono::high_resolution_clock::now();
    while (cur && i < start)
    {
        cur = cur->next;
        i++;
    }
    while (cur && i <= end)
    {
        auto transferStartTime = chrono::high_resolution_clock::now();
        mtx.lock();
        counts[cur->data]++;
        dataTransferSize += sizeof(cur->data);
        cout << threadName << ": data = " << cur->data;
        mtx.unlock();
        auto transferEndTime = chrono::high_resolution_clock::now();
        transferTime += chrono::duration_cast<chrono::microseconds>(transferEndTime - transferStartTime);
        cur = cur->next;
        i++;
    }
    auto computationEndTime = chrono::high_resolution_clock::now();
    auto computationTime = chrono::duration_cast<chrono::microseconds>(computationEndTime - computationStartTime);
    totalComputationTime += computationTime;
    cout << ", computation/t: " << computationTime.count() << " μs";
    cout << ", transfer/t: " << transferTime.count() << " μs";
    cout << ", transferred data size: " << dataTransferSize << " bytes" << endl;
}

void mergeCounts(vector<int> &counts, vector<int> &result)
{
    for (int i = 0; i < counts.size(); i++)
    {
        result[i] += counts[i];
    }
}

void countSortParallel(Node *head)
{
    const int numThreads = 4;
    vector<thread> threads(numThreads);
    vector<vector<int>> subCounts(numThreads, vector<int>(1001, 0));
    vector<int> counts(1001, 0);
    vector<int> dataTransferSizes(numThreads, 0); // Add an array to keep track of the data transfer sizes for each thread
    mutex mtx;
    int len = 0;
    Node *cur = head;
    while (cur)
    {
        len++;
        cur = cur->next;
    }
    int blockSize = len / numThreads;
    int start = 0, end = blockSize - 1;
    chrono::microseconds totalComputationTime(0);
    vector<chrono::microseconds> transferTimes(numThreads, chrono::microseconds(0));
    for (int i = 0; i < numThreads; i++)
    {
        if (i == numThreads - 1)
        {
            end = len - 1;
        }
        threads[i] = thread(countSort, head, start, end, ref(subCounts[i]), ref(mtx), "Thread " + to_string(i), ref(totalComputationTime), ref(transferTimes[i]), ref(dataTransferSizes[i]));
        start += blockSize;
        end += blockSize;
    }
    for (int i = 0; i < numThreads; i++)
    {
        threads[i].join();
    }
    for (int i = 0; i < numThreads; i++)
    {
        mergeCounts(subCounts[i], counts);
    }
    cur = head;
    int i = 0;
    while (cur)
    {
        while (counts[i] == 0)
            i++;
        cur->data = i;
        counts[i]--;
        cur = cur->next;
    }
    int totalDataTransferTime = 0, totalDataTransferSize = 0;

    for (int i = 0; i < numThreads; i++) {
        totalDataTransferTime += transferTimes[i].count();
        totalDataTransferSize += dataTransferSizes[i];
    }
    cout << "Total data transfer times: " << totalDataTransferTime << " μs" << endl;
    cout << "Total data transfer size: " << totalDataTransferSize << " bytes" << endl;
    cout << "Total computation time: " << totalComputationTime.count() << " μs" << endl;
}

int main()
{
    Node *head = new Node{2, new Node{5, new Node{1, new Node{8, nullptr}}}};
    auto main_start_time = chrono::high_resolution_clock::now();
    countSortParallel(head);
    auto main_end_time = chrono::high_resolution_clock::now();
    auto elapsed_time_parallel = chrono::duration_cast<chrono::microseconds>(main_end_time - main_start_time).count();
    cout << "Parallel execution time: " << elapsed_time_parallel << " μs" << endl;
    Node *cur = head;
    cout << "Sorted array: ";
    while (cur)
    {
        cout << cur->data << " ";
        cur = cur->next;
    }
    cout << endl;
    return 0;
}