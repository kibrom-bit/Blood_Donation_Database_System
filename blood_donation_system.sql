

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Database: `blood_donation_system`
--
--
-- Table structure for table `blood_bank_inventory`
--

CREATE TABLE `blood_bank_inventory` (
  `inventory_id` int(11) NOT NULL,
  `blood_type` varchar(10) NOT NULL,
  `quantity` float DEFAULT 0,
  `last_updated` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `blood_donations`
--

CREATE TABLE `blood_donations` (
  `donation_id` int(11) NOT NULL,
  `donor_id` int(11) DEFAULT NULL,
  `blood_type` varchar(10) DEFAULT NULL,
  `quantity` float DEFAULT NULL,
  `donation_date` datetime DEFAULT current_timestamp(),
  `staff_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `donors`
--

CREATE TABLE `donors` (
  `donor_id` int(11) NOT NULL,
  `donor_name` varchar(255) NOT NULL,
  `gender` varchar(50) DEFAULT NULL,
  `blood_type` varchar(10) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `contact` varchar(15) DEFAULT NULL,
  `address` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `donors`
--

INSERT INTO `donors` (`donor_id`, `donor_name`, `gender`, `blood_type`, `dob`, `contact`, `address`) VALUES
(1, 'mesele', 'Male', 'O+', '2001-01-01', '15657478655', NULL),
(2, 'mesele', 'Male', 'O+', '2001-01-02', '15657478655', NULL),
(3, 'mesele', 'Male', 'O+', '2001-01-02', '15657478655', NULL),
(4, 'mesele', 'Male', 'O+', '2001-01-02', '15657478655', NULL),
(5, 'mesele', 'Male', 'O+', '2001-01-02', '15657478655', NULL),
(6, 'kkkkk', 'Male', 'O+', '4231-12-31', '1234565432', NULL),
(7, 'kkkkk', 'Male', 'O+', '4231-12-31', '1234565432', NULL),
(8, 'kkkkk', 'Male', 'O+', '4231-12-31', '1234565432', NULL),
(9, 'kkkkk', 'Male', 'O+', '4231-12-31', '1234565432', NULL),
(10, 'kkkkk', 'Male', 'O+', '4231-12-31', '1234565432', NULL),
(11, 'kkkkk', 'Male', 'O+', '4231-12-31', '1234565432', NULL),
(12, 'kkkkk', 'Male', 'O+', '4231-12-31', '1234565432', NULL),
(13, 'kkkkk', 'Male', 'O+', '4231-12-31', '1234565432', NULL),
(14, 'mesele', 'Male', 'O+', '2017-02-20', '98765432', NULL),
(15, 'mesele', 'Male', 'O+', '3222-12-12', '098765432', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `staff_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `contact` int(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `staff`
--

INSERT INTO `staff` (`staff_id`, `username`, `password`, `role`, `created_at`, `contact`) VALUES
(1, 'kibrom', '$2a$10$FGKOrsWkFmgigIbPTYz16O/wV3SDjeZFVga.85SVYEPGjvFfzMv/S', 'Admin', '2025-01-27 18:27:15', NULL),
(4, 'alee', '$2a$10$3KsHQ.ofsU60eIFKJLeHruo1niTsoTpbdDJ7EPeqbqQh9n3H1JFv2', 'blood_bank', '2025-01-27 19:12:23', NULL),
(5, 'aleee', '$2a$10$oF7fpjNtKqUnrp7rRi3rYuR4AMXZUgx2MWvYvuGiKUVTz5JxAzfJu', 'blood_bank', '2025-01-27 19:13:01', NULL),
(6, 'aaaa', '$2a$10$PwHeNft.YLTudx95recKx.2ghEFhQiRjfAnSY19phsefXFPOLNaO6', 'blood_accumulator', '2025-01-27 19:13:32', NULL),
(7, 'miki', '$2a$10$Ncf/uQC26BI32uCLTD41meO3ICXNBEYcmS7sDdVJkIgcOl4HYMkoe', 'blood_bank', '2025-01-27 20:20:46', NULL),
(8, 'selee', '$2a$10$eN79YhwV3ZjMUag9/xVNkOsHsmCM6KS56ddPVUIgGz0NVU0Uy0x2K', 'blood_accumulator', '2025-02-21 21:41:48', NULL),
(9, 'kkk', '$2a$10$RQiyNOItW3PmFep5YTTiquKueK8vp9pzAaouLnEoGrN7s5eFcJjVm', 'blood_accumulator', '2025-02-22 05:25:48', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blood_bank_inventory`
--
ALTER TABLE `blood_bank_inventory`
  ADD PRIMARY KEY (`inventory_id`);

--
-- Indexes for table `blood_donations`
--
ALTER TABLE `blood_donations`
  ADD PRIMARY KEY (`donation_id`),
  ADD KEY `donor_id` (`donor_id`),
  ADD KEY `staff_id` (`staff_id`);

--
-- Indexes for table `donors`
--
ALTER TABLE `donors`
  ADD PRIMARY KEY (`donor_id`);

--
-- Indexes for table `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`staff_id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blood_bank_inventory`
--
ALTER TABLE `blood_bank_inventory`
  MODIFY `inventory_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `blood_donations`
--
ALTER TABLE `blood_donations`
  MODIFY `donation_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `donors`
--
ALTER TABLE `donors`
  MODIFY `donor_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `staff`
--
ALTER TABLE `staff`
  MODIFY `staff_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `blood_donations`
--
ALTER TABLE `blood_donations`
  ADD CONSTRAINT `blood_donations_ibfk_1` FOREIGN KEY (`donor_id`) REFERENCES `donors` (`donor_id`),
  ADD CONSTRAINT `blood_donations_ibfk_2` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`staff_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
