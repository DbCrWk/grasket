%% Set Parameters
excitement = 0.1017;
power = 0.015;
dim = 5;
iterations = 400;


%% Intermediate Values
p_increase_edge = (1 + power) / 2;


%% Setup Iterations
A = eye(dim);
A_i = zeros(iterations, dim, dim);
realized_should_change = rand(1, iterations) < excitement;
realized_should_increase_edge = rand(1, iterations) > p_increase_edge;


%% Run Iterations
for i = 1:iterations
    if realized_should_change(i)
        j = 0;
        k = 0;
        
        current_total_weight = sum(sum(A, 1));
        
        if realized_should_increase_edge(i)
            % Weight is maximal
            if current_total_weight ~= dim * dim
                while j == k || A(j, k) == 1
                    j = floor(rand(1) * dim) + 1;
                    k = floor(rand(1) * dim) + 1;
                end

                A(j, k) = 1;
                A(k, j) = 1;
            end
        else
            % Weight is minimal
            if current_total_weight ~= dim
                while j == k || A(j, k) == 0
                    j = floor(rand(1) * dim) + 1;
                    k = floor(rand(1) * dim) + 1;
                end

                A(j, k) = 0;
                A(k, j) = 0;
            end
        end
    end
    
    A_i(i, :, :) = A;
end

%% Visualize
w = sum(sum(A_i, 2), 3);
scatter(1:iterations, w)