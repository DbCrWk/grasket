% Data
% d = [8; 7; 6; 6; 7; 8; 9; 10; 10; 10];

% Parameters
p = 0.015;
e = 0.1017;

% Setup
probability_0 = 1 - e;
probability_1 = e * ((1 + p) / 2);
probability_neg_1 = e * (1 - (1 + p) / 2);

probability_check = probability_0 + probability_1 + probability_neg_1;

assert(probability_check == 1)


% Pre-Process
diff_aug = [d(1); d] - [d; 0];
diff = diff_aug(1:length(diff_aug) - 1);

total = length(diff);
probability_0_empirical = sum( diff == 0 ) / total;
probability_1_empirical = sum( diff >= 1 ) / total;
probability_neg_1_empirical = sum( diff <= -1 ) / total;

transition_matrix = zeros(3, 3);
for i = 1:total
    if i == total
        break;
    end
    
    first = diff(i);
    second = diff(i + 1);
    
    first_index = 1;
    if first == 0
        first_index = 2;
    end
    if first > 1
        first_index = 3;
    end
    
    second_index = 1;
    if second == 0
        second_index = 2;
    end
    if second > 1
        second_index = 3;
    end
    
    current = transition_matrix(first_index, second_index);
    
    transition_matrix(first_index, second_index) = current + 1;
end

transition_matrix = transition_matrix ./ sum(transition_matrix, 2)