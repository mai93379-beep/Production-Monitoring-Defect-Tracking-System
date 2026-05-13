-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th5 13, 2026 lúc 06:29 PM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `production_monitoring`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `defects`
--

CREATE TABLE `defects` (
  `id` int(11) NOT NULL,
  `line_id` int(11) DEFAULT NULL,
  `defect_type` varchar(255) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `defect_time` datetime DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `defects`
--

INSERT INTO `defects` (`id`, `line_id`, `defect_type`, `quantity`, `defect_time`, `description`) VALUES
(1, 1, 'Lệch linh kiện', 15, '2026-05-13 08:10:00', 'Phát hiện lệch IC tại vị trí U12'),
(2, 1, 'Thiếu linh kiện', 8, '2026-05-13 08:30:00', 'Thiếu tụ điện trên bo mạch'),
(3, 2, 'Cầu hàn', 12, '2026-05-13 09:00:00', 'Xuất hiện lỗi cầu hàn tại chân IC'),
(4, 2, 'Sai cực linh kiện', 4, '2026-05-13 09:15:00', 'Tụ điện bị cắm ngược chiều'),
(5, 3, 'Lỗi SPI', 6, '2026-05-13 10:00:00', 'Kem hàn không đạt tiêu chuẩn'),
(6, 4, 'Lỗi AOI', 10, '2026-05-13 10:30:00', 'Camera AOI phát hiện lỗi bất thường'),
(7, 5, 'Nhiệt độ bất thường', 2, '2026-05-13 11:00:00', 'Máy hoạt động quá nhiệt'),
(8, 1, 'Sai vị trí linh kiện', 9, '2026-05-13 11:30:00', 'Linh kiện bị lệch tọa độ'),
(9, 4, 'Thiếu thiếc', 7, '2026-05-13 12:00:00', 'Mối hàn không đủ thiếc'),
(10, 5, 'Dừng chuyền', 1, '2026-05-13 12:30:00', 'Line tạm dừng do lỗi motor');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `production_lines`
--

CREATE TABLE `production_lines` (
  `id` int(11) NOT NULL,
  `line_name` varchar(100) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `output_today` int(11) DEFAULT NULL,
  `shift_name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `production_lines`
--

INSERT INTO `production_lines` (`id`, `line_name`, `status`, `output_today`, `shift_name`) VALUES
(1, 'SMT Line 1', 'Đang chạy', 12500, 'Ca sáng'),
(2, 'SMT Line 2', 'Tạm dừng', 8400, 'Ca chiều'),
(3, 'SMT Line 3', 'Bảo trì', 0, 'Ca đêm'),
(4, 'DIP Line 1', 'Đang chạy', 6400, 'Ca sáng'),
(5, 'Assembly Line 1', 'Cảnh báo', 5100, 'Ca chiều');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `production_logs`
--

CREATE TABLE `production_logs` (
  `id` int(11) NOT NULL,
  `line_id` int(11) DEFAULT NULL,
  `log_message` text DEFAULT NULL,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `production_logs`
--

INSERT INTO `production_logs` (`id`, `line_id`, `log_message`, `created_at`) VALUES
(1, 1, 'Line SMT 1 bắt đầu sản xuất', '2026-05-13 07:00:00'),
(2, 1, 'AOI phát hiện lỗi lệch linh kiện', '2026-05-13 08:10:00'),
(3, 2, 'Line SMT 2 tạm dừng kiểm tra', '2026-05-13 09:20:00'),
(4, 3, 'Line SMT 3 chuyển sang chế độ bảo trì', '2026-05-13 10:00:00'),
(5, 4, 'DIP Line 1 đạt sản lượng mục tiêu', '2026-05-13 11:00:00'),
(6, 5, 'Assembly Line cảnh báo nhiệt độ cao', '2026-05-13 11:15:00'),
(7, 1, 'Engineer xác nhận lỗi AOI', '2026-05-13 11:40:00'),
(8, 4, 'Thiếu thiếc được xử lý thành công', '2026-05-13 12:10:00'),
(9, 5, 'Motor line được kiểm tra', '2026-05-13 12:40:00'),
(10, 1, 'Line SMT 1 tiếp tục hoạt động ổn định', '2026-05-13 13:00:00');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(50) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `role`, `full_name`) VALUES
(1, 'admin01', '123456', 'Admin', 'Nguyễn Văn Huy'),
(2, 'engineer01', '123456', 'Engineer', 'Trần Quốc Bảo'),
(3, 'operator01', '123456', 'Operator', 'Lê Minh Tuấn'),
(4, 'operator02', '123456', 'Operator', 'Phạm Đức Anh'),
(5, 'engineer02', '123456', 'Engineer', 'Vũ Thanh Tùng');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `defects`
--
ALTER TABLE `defects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `line_id` (`line_id`);

--
-- Chỉ mục cho bảng `production_lines`
--
ALTER TABLE `production_lines`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `production_logs`
--
ALTER TABLE `production_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `line_id` (`line_id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `defects`
--
ALTER TABLE `defects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `production_lines`
--
ALTER TABLE `production_lines`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `production_logs`
--
ALTER TABLE `production_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `defects`
--
ALTER TABLE `defects`
  ADD CONSTRAINT `defects_ibfk_1` FOREIGN KEY (`line_id`) REFERENCES `production_lines` (`id`);

--
-- Các ràng buộc cho bảng `production_logs`
--
ALTER TABLE `production_logs`
  ADD CONSTRAINT `production_logs_ibfk_1` FOREIGN KEY (`line_id`) REFERENCES `production_lines` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
