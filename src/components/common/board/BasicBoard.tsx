// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ChevronUp } from "lucide-react";
import LabelCalendar from "@/components/common/calendar/LabelCalendar";
import MarkdownDialog from "../dialog/MarkdownDialog";
import styles from "./BasicBoard.module.scss";

function BasicBoard() {
    return (
        <div className={styles.container}>
            <div className={styles.container__header}>
                <div className={styles.container__header__inputBox}>
                    <Checkbox className="w-5 h-5" />
                    <input type="text" placeholder="Board Title Here..." className={styles.input} />
                </div>
                <Button variant="ghost">
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                </Button>
            </div>
            <div className={styles.container__body}>
                <div className={styles.container__body__calendarBox}>
                    <LabelCalendar label="From" />
                    <LabelCalendar label="To" />
                </div>
                <div className={styles.container__body__buttonBox}>
                    <Button variant="ghost" className="font-normal text-gray-400 hover:bg-green-50 hover:text-green-500">
                        Duplicate
                    </Button>
                    <Button variant="ghost" className="font-normal text-gray-400 hover:bg-red-50 hover:text-red-500">
                        Delete
                    </Button>
                </div>
            </div>
            <div className={styles.container__footer}>
                <MarkdownDialog />
            </div>
        </div>
    );
}

export default BasicBoard;
