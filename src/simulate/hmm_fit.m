%% Data
% We assume there is a hmm_raw with the data we need

%% Process
hmm_raw_size = size(hmm_raw);
length = hmm_raw_size(1);

prev_value = 0;
for i = 1:length
    curr_value = hmm_raw(i, :);
    
    
    
    prev_value = curr_value;
end