import BaseDto from "../../../common/dto/base.dto.js";
import z from "zod";

class bookTicketDto extends BaseDto {
  static schema = z.object({
    seatNo: z.string().trim(),
  });
}

export default bookTicketDto;
