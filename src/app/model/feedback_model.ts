
export interface FeedbackQuestion {
    id: number;
    question: string;
}

export interface Feedback{
    patientId: number;
    reportId: number;
    rating1: number;
    rating2: number;
    rating3: number;
    rating4: number;
    rating5: number;
    rating6: number;
    rating7: number;
    rating8: number;
}