import { Component, OnInit } from '@angular/core';
import { MedicalTest, DiagTest } from 'src/app/model/medical_test';
import { DoctorService } from 'src/app/service/doctor.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppointmentService } from 'src/app/service/appointment.service';
import { LoginServiceService } from 'src/app/service/login-service.service';
import { MedicaltestService } from 'src/app/service/medicaltest.service';
import { PatientService } from 'src/app/service/patient.service';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-viewreport',
  templateUrl: './viewreport.component.html',
  styleUrls: ['./viewreport.component.css']
})
export class ViewreportComponent implements OnInit {
  appId = "";
  medicalTest: MedicalTest;

  tests: DiagTest[] = [];

  // tslint:disable-next-line: max-line-length
  constructor(
    private docService: DoctorService,
    private router: Router,
    private appointmentService: AppointmentService,
    private loginservice: LoginServiceService,
    private medService: MedicaltestService,
    private patService: PatientService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.appId = params.get("id");
      this.medService
        .getMedicalTest(this.appId)
        .subscribe((res: MedicalTest) => {
          this.medicalTest = res;
          if (this.medicalTest.diagName1 != "") {
            this.tests.push({
              name: this.medicalTest.diagName1,
              actualValue: this.medicalTest.diagActualValue1,
              normalRange: this.medicalTest.diagNormalRange1
            });
          }
          if (this.medicalTest.diagName2 != "") {
            this.tests.push({
              name: this.medicalTest.diagName2,
              actualValue: this.medicalTest.diagActualValue2,
              normalRange: this.medicalTest.diagNormalRange2
            });
          }
          if (this.medicalTest.diagName3 != "") {
            this.tests.push({
              name: this.medicalTest.diagName3,
              actualValue: this.medicalTest.diagActualValue3,
              normalRange: this.medicalTest.diagNormalRange3
            });
          }
          if (this.medicalTest.diagName4 != "") {
            this.tests.push({
              name: this.medicalTest.diagName4,
              actualValue: this.medicalTest.diagActualValue4,
              normalRange: this.medicalTest.diagNormalRange4
            });
          }
          if (this.medicalTest.diagName5 != "") {
            this.tests.push({
              name: this.medicalTest.diagName5,
              actualValue: this.medicalTest.diagActualValue5,
              normalRange: this.medicalTest.diagNormalRange5
            });
          }
          if (this.medicalTest.diagName6 != "") {
            this.tests.push({
              name: this.medicalTest.diagName6,
              actualValue: this.medicalTest.diagActualValue6,
              normalRange: this.medicalTest.diagNormalRange6
            });
          }
        });
    });
  }


  downloadPDF() {
    const documentDefinition = {
      info: {
        title: 'TestReport_1234',
        author: 'clinix',
      },
      content: [
        { text: "Medical Test Report", style: "header", alignment: "center" },
        {
          margin: [0, 20],
          columns: [
            [
              {
                text: "Appointment ID: ",
                style: "bold"
              },
              {
                text: "Test Date: ",
                style: "bold"
              },
              {
                text: "Patient Name: ",
                style: "bold"
              },
              {
                text: "Gender: ",
                style: "bold"
              },
              {
                text: "Date of Birth: ",
                style: "bold"
              },
              {
                text: "Doctor Name: ",
                style: "bold"
              },
              {
                text: "Medicare Service: ",
                style: "bold"
              }
            ],
            [
              {
                text: this.appId,
                style: "normal"
              },
              {
                text: this.medicalTest.testResultDate.toString().substring(0, 10),
                style: "normal"
              },
              {
                text: this.medicalTest.patient.firstName + " " + this.medicalTest.patient.lastName,
                style: "normal"
              },
              {
                text: this.medicalTest.patient.gender,
                style: "normal"
              },
              {
                text: this.medicalTest.patient.dateOfBirth.toString().substring(0, 10),
                style: "normal"
              },
              {
                text: this.medicalTest.doctor.firstName + " " + this.medicalTest.doctor.lastName,
                style: "normal"
              },
              {
                text: this.medicalTest.doctor.medicareService.medicareService,
                style: "normal"
              }
            ],
            [
              {
                // tslint:disable-next-line: max-line-length
                image:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAecAAACQCAYAAAAyXaOZAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAABQUSURBVHhe7d0LkBzFfcfx7t3Z3XvIPJykUpXwSmwwQhKGigMCgwMoIB8WNsKSQJSJEYmp2C5SwcaKROlxhwgIv1IkVUkZECJWsMzDYAKSeRmHGBsHxxb47sDGwTGJU6lylY2ILN3ts/P/37aoM3rd7fbe9cx9P7A13b2n3bnZ7fl178zOWeecAQAA8cj5JQAAiAThDABAZAhnAAAiQzgDABAZwhkAgMgQzgAARIZwBgAgMoQzAACRIZwBAIgM4QwAQGQIZwAAIkM4AwAQGcIZAIDIEM4AAESGcAYAIDKEMwAAkSGcAQCIDOEMAEBkCGcAACJDOAMAEBnCGQCAyBDOAABEhnAGACAy1jnni0A6nTW4+gRZLG/Wxmx9Zt7NL/syAKQO4YxUGh/IRZN8qmJqvVr2+iWcB3wZAFKHcEZq7A3kLls4qmHc5RVX62nesw/CGUCqccwZ0dNQ7hsaeFVmyN+Xav+oq/7ZQYIZAFKPmTOi9L7hDcuqrnZ53uaKVVc/TgJ5tr9rIpg5A0g1Zs6Iis6S5bZ+T6O8ZY+rfGBXY7RvksEMAKlHOCM2epJXf9XUi80qAMw8hDMAAJEhnAEAiAzhDABAZAhnAAAiQzgDABAZwhkAgMgQzgAARIZwBgAgMoQzAACRIZwBAIgM4QwAQGQIZwAAIkM4AwAQGcIZAIDIEM4AAESGcAYAIDKEMwAAkSGcAQCIjHXO+SIw/c4aXL1eFv3NWsv6n5l384Avd5ys8wndtnBb0SZvy5lcYmXQ+8vG7rNlHV72P4JpsPTFWy4dcZXP54xNpHrNP89Zc2/zHiB+hPMMcuHwDUsrrrZcdlb6icnYpyZWyhImRt8FzriGtkm5oeWSTbZum7PuPm2bKmkJ5wWD6+Zba1bmJYzrpnHcqKvO83ft1dI6nDu4Zn7e5lYWbL7LN02KdGd53QpffGjO9TMqiHSAVDTJTbLtksTmivK6FHc3ymdWTb1b759lS9sendu/aOyH3+T8ofXzG8Zd56utk41fNrXrOzkoe+9Q/5KqaVzmq5PgpJvbN3b2PbZ478MMVqJGOGeU7qxksbxZayqY/GrZWZV89ZDk58vy8zf7qtra6dlgrOH85u3ZZQuXSCCf7Kv709I6LBha+5Wyq13iqy15a6735zJL/G1f/TX7e1+M0/HXN6Q3/S7Hym1Fs7ivg4Vz39DA9l1utM9X27VZbhs7sR3195UByI6KqfX4ppYl0rdrpn5yml7vmYZwzpDxOysJ1oUSrGdoORQJpJckkO7xVRV8Zy6/QzThPJmd/35MWzgnJlepmcbemfybg/iAv4e8vj+Q1/cBX90rqsAe/5qUbHKtbKvDtXwovRLOjx04nB+VcF7oq22T7Tgo23FJyO2mv7f06UHp00XfFELwQSzCIZwzwu+0VsltMgHSruCzhBjCeW8AyCzlWpmlTGjnvx/TFs7eZln/FbL+vtoamWGZxOYelLB5QarTFtT6mkjobay5xmKZ8fnWiTtYOHei75RsYUfZVS8Lsb10/eS1/FG7r+V4RZMfqZj6KdP1euLQOFs7A/RYctEm35fiVAazWiHPu+Oi4RuX+Xrqje0IbfLvUuxvI5hj0HYwKw1CCebFUuyXwHnMB9mU8sH8lK5HK8F8KD6gXm3WwpBgPlVm9g8H2l7LQwazkinZZoI5boRzimnHP39o/ebRRvXOiqv1+uYpJc/bs7tR3nSBrMd07Lg7YLn8Tm/xZYwjgXNcty083Dc8sF1e76CHTA5huQTz7/pyp2yV2elOXw6i7Gpjn8A0a625YKj/DBmYXOqrQcjg8+Wqqd/qq4gU4ZxCGoLnDq65V2Yy9424ypUyqp7l75oW+vx7ZD1kJ3LfebJeGQlp7MeIq56wqzHaVzeN7TIw/OqCoXVL/F2pprNIeR+fXjD5Ud8UhPSJD7baH84bXDu/buoPycBktm9qmwxAHpfB50XMmuNHOKeM7+irZOS7VGYyBztbeMrJTuTkiqyXFFcR0Nkms8IjZGD4AWfcJnmt12fh9dbAkn610VeDkD6hJ+a11B8KNr9GtvNv+WoIm2UAcg3BnA6Ec4poB5eR/V1SnOpjy5O1QteTgM4+mYUdJgs9gS8rA7KtcuvvtoVXmtUgtL9O6uNt3ZYN0zjeV0N5lWBOD8I5JbSzFk3+1tBfj+oUXc9iuBNiED8NoNQHtIaX3AYSmw8aYkWTrFw41D+hQwC6Dbts4Rt6CME3tU0Gy9+ShQ48kBKEcwpoZ9UzPyum/l7flAoyqzqhZAjoGWSFvN6f9OVUq7nGBulzr/lq2yqm1mONudJXD0j7in5bYNRVf8c3ta1kCy/IYPkqZs3pQjhHTjurjHo3+TM/U6dsamPrT0DPDM6ay96fga/WPTF34FnnTNDLW0ofPueSF28+4JnX2kcSk78j5LcFpO9Vyq66jGBOH8I5fstl1HuWL6eSX/+2vlKCdNBj0Lsao/+YhcGYzHY/Lwu90E4Q0g96X6vvPti2WV4z9bN9OQiZhf8vwZxOhHPEfCfWyy0CqSEh1FU0yffSHtA+1PTs7ZABXZLA3GfbdKKvl+R5drvyBb6KlCGcI+U761RfjhMIQr/7LovUf1qyN6D14+FmS/sqbmzbvHHynC5lMLNFisH6uh5nLrva5cya04twjlTR5K+VReqDucsWBuX2oBQ5U3SGkUBb/eYZYhppwFlj9SuMIb3x9apuW7xdBjOnaTmEblv4YWJyHyWY041wjlQpV0j9x9kyev/JqKsueXLuDZewo5h59CNcWWTiXAMJz8+VbPIfvhqEPN7FeoW1mqsHC2Y14qpffmxu/7O+ipQinCO0ePimZaON6nt8tSNkVjNyRK7nfw7Pdf/ssFz3f8vtZ4dLXdqDXL5QHueRsqv2EcozW5ctXL5wqD8V380/GH0fl13tffpJkG9qmzzeKRLMW/QYvW9qW9Eku2TBp1QZQDhHRj8GfL0xslnP7PRNwfgdi17NqV8e/5RH5qw9atucdUdvn7PuGLkdvU3q0v7OvT/T4o5IT57Rx/8kwYzR5oU0Vjdr6abv54ZzQd/TddMIFsx6XFxm+O+i32UD4Rwf/fNwPb4cylhg6kfM0nEH/G2/HVjb9/6M/rw0aVBP9GxV/Tn9+84HfHxMu7H3woFuoT45GU8C6O1ZOPaspG9eL4uJ9ocpJQPim+h32UE4R0R3YDJb/bCvBqFfp5BFS4GpP6//Toob5XG+22zdl9z3C9mp/70U9XnYOURGA3eW7fpa0SRfkere98J+b0WbXNFjiw/J+/Cl5r9unwzyZsvjrfTVVJNtpO/vjbItv9NsmX76+nbbog4Y+Dg7QwjnuOjfrf09X26b7EAeC/F1Cv338jgfkp32XeNnVt228HKvLW0zziz6xrwbP97u8yA8eb1Gjsz3nv/o3PUXPjVvg35yctDX6LG5/fc/PnfgYnkfXtziYY39kvUIdjnK6abbUGbQH5btM+ybplV3rvj0E3MHuDxnxhDOGVWyhZ/KDuQvQnVYfRzZaa8o2Pw9WteQHnHVi2Rnvujr8zZEM4vAr8vb3JceOGn1M746Yfp662GN8YOxdsh6FH0xE/z2uc9Xp428PhVr7J2+igwhnCPhj8kF+fqUznjKrrqwEyPpPa5ykyz0hK93duLxEdRmCZBP+/Kk6esrr3OQv28s78djsnLceZytRZPs9OVpoceZt81ZG/Qa4IgD4RwP/T5okIuOyEj6J50KTn1cuenxSYI5fiH+fq8G0Ou+3LIRVz3+LbbrCV/NBN22FVM7XQbDz/umqcZx5gwjnLNn84irZOLkG7QlyI7bB9BpEkBtnyCWs7m8L2aGbp9RV7005PH5SQgx+EKkCOfsocNCBXsf6OMUbP6nvtqynLGZC2el26dokz+XgP6xb+q4xOT+VRbMmjOMcAYiYo21vhiVumvUfLEdUf5uIWyfs+7bMoO+21c7qmSTl2um8REG4dlGOGdI0SS/kgWj6RSTcG67T8qsSv+CUtD3QcO4EOGcdXp8frcvd4TM0L9edrWLCObsI5wzpGJqn6XTpluIqeVhue6dvA+mnm5z6YOf8dXg9Lh2xdU+xms7MxDOQERkhlr3RaSTfmLRkct7Omf0mxIE8wxBOAMRcfIf0suH56vNWli8N2YWwhkAAtELrZRs4UpfDapo88H+ghXiRzgDQAAazAWTv7Psqsf5pqDKrnbe+4dvfLevIuMI52w5NoOXSATSYnnV1DsWnvLY3SOucgd9fGYgnLNFL/+plwEFMIV8YAa5Nv7BjLjqiTI7f4GAzj7CGQDaoEFZNMkWKQa5Nv6hyAy6q2iTHxHQ2UY4A0AbSrZwnV5/3FenRKV5TRg+JcswwjkeWwsmX/bllnXb4hWLhjec6asAOqhvaGCpMW6Zr06pLlu4lNlzdhHOkdDvR1ZN/WZfbdmIq7xNbo+cP7R+iW8K6tzBNfMXDK69/7zBNfeyY8BMpu//sqltLrva4b5pSo266uySTb507uDa+b4JGUI4Z5DsLI6su8bm0OGpj5ez9u9kh/TBiqnLjMGsIqAxE/n3/aqKq/U2W6aH9PU/KNjc9b6KDCGcM6piarNkESw89XGKJnlOdgbv8k1qhYzcvyz3rSekMcPo8d4pOQHsUBrGvYP+lz2Ec1y2Fm3ypC+HsEIC9XvtdtyxYLbJdyXw9/n4TsL6VFn0y/M8xA4CM8FYfzD5v/LVaTfqqid02cKT9L9sIZwjMvZXbVztGV8NQmfQEpzPL37x5kt906Q0d0TJDlmvw3zTfsnznCgB3vZAAEiB5RVT7/blKEhAH12yha/R/7KDcI6P/k3YEV8OQoKze2d996a+oRseXTC09rZDdWC9X37uC31DA9u7beFh+fc9/q6DkgCfJSP4+/94aN0D5wyu4SQVZM6i4Q3v1m9E+GpUyq76+wWT30RAZwPhHBmdPRds/ue+GkzV1Ht3uZGFZVf7iFT1WLQeJ97vTe+Xn7t6lxvtG3HVSXV0GcHPk9vivLV/K4/FTgKZoe9neW/frt+I8E3RkX5+liz4/nMGEM4R2u3KF5Rs4Xlf7QQ9kaX/ILe2T3SRcP9Df5lBDXxCGqmm72E9vCPhPNs3haB/91nP19jTrAbDNfYzgHCOkM6erTH/6auppZcZlIWGPV+5QmqNBbNNnpvo4Z1JeFX6+oA87qldtjDs20LQE0G/SJ9LN8I5UjVX/7R0sOd8Ne1WHJ7reeqi4RvP8HUgTZZXAl9opGDy35LFVi3rYLxkk6sloH+s9RAk8E+Xx7zOV5FChHOk/mXeX39HOtgV0omDnhw2XazcnPwHpInOPiU09YI7wUhovlI19as0lH2T2TZn3bdHXfVuXw1lafPyokgjwjli2nmlE9/iq6m2s7Hn9kfmrH3WV4Ho6aVqiza5W0Jzjm9qW8kW/qvsaheOD+Zx9DoHv/LltsnzHFE2tTv5eDudCOf46UdfeuJImun6j32EB6RFYvN6ec7xV8Rri8zAXyq76vkHCOa91zn4rK8GoV9vlAXnfKQQ4Rw535E3yq2/2xZfGWtMFw3mjQfaIQEx0jBzxr3DV0P54QT6QScG4/rtC75elTKEcwpoh5bbwKxc15VpOgZdbF6KlGBGqmgwl2zyhVFXPdE3ta1okn/Tkzx99YB8X9koA/HN0tdHm63t08uNMntOF8I5RR48afUzR+R7L4h9Bq3rJzujWyqu9nGCGWnig3l72dXO8U1tK9nCCxVT+xM9ydM3HZT2mSfmDlzVnSs+7Zva5i83yuw5RQjnlNGAHnGVLb4aJV2/p+ZtWEUwI000mBOTv0OCOdgVwBKTq5RddVkrfWGkUQl6rQO97Oii4Q1n+ioiRzinkx6X6pcdSblZjQonfyGtltdM/WxfDqJmGje1OkitmvrfFEw+2B/C0cuOjrrqHXy8nQ6EcwppZ5fbgOxITi6a5DXfPK2KNnldFno1MI4xI3V8YB3brIUhfVP7RMsDVe1HEtB/KsVgJ4jp5UdlvXYQ0PEjnFNMO2/F1PSvP2kohj7Dc0JKNtkhi/6Kq52mAwaCGWnjg2qV3Nq+pvxe/jiz9om2+oP/9/ptjWD9W9arRwL6OQI6boRzymnn1VCU4sZuW/hqly38oHlPZ8nzDPbY4kPOuY/p87e7EwI6Sa9QdyASVJ+QRcBgTl7LG/vRUH3CP87GgslXmi3tk4DWy5FygljECOeM0A78xNwbFo+66lIJzW/KDme3vysofVx9fHmeJY/PHbj4qXk3TugMVExMty3e0+65BG7s/7AazoX4M6YNv5xy8sQHfO5SLjnGF4NwztwjfSPo1fC0fyc2H7SvHZbr5lr3EbMy8/FFZIn/yGpsZHxErufq3Y3yb1ZNvaj1ydCgmJUr/WJnY89tvmlrJ2fJut5H5nqflplOqwNH98vG7ve0uo76/G/N9X7TV1siParxWmP3H03HOmgw/0Z+1pa7TvzLT/mmIHSdZFB2fZct9PmmSdFtIu/DLVtmf2Klb5owfW75t/+UM7blY8Ly/Nc8PGfNvb76az700ucu+7/GyK2+2g597/2DLDvSR3Q79NrSpqJNjpf+cbAPAybkpNJRQxvffuUCX0VkCOcZQju2LPb5GEs6+sqKGzsGtadiavu7SEJHwxgAsC/CeYYbF9qEMABEgnAGACAynBAGAEBkCGcAACJDOAMAEBnCGQCAyBDOAABEhnAGACAyhDMAAJEhnAEAiAzhDABAZAhnAAAiQzgDABAZwhkAgMgQzgAARIZwBgAgMoQzAACRIZwBAIgM4QwAQGQIZwAAIkM4AwAQGcIZAIDIEM4AAESGcAYAIDKEMwAAkSGcAQCIDOEMAEBkCGcAACJDOAMAEBnCGQCAyBDOAABExZj/B9pWyKyp8ZhvAAAAAElFTkSuQmC",
                width: 150,
                margin: [0, 60],
                alignment: "right"
              }
            ]
          ]
        },
        { text: "TESTS", style: "subheader", margin: [0, 10, 0, 10] },
        {
          style: "tableExample",
          table: {
            widths: ["*", "*", "*"],
            body: [
              [
                {
                  text: "Test Name",
                  bold: true
                },
                {
                  text: "Actual Value",
                  bold: true
                },
                {
                  text: "Normal Range",
                  bold: true
                }
              ],
              ...this.tests.map(t => {
                return [t.name, t.actualValue, t.normalRange];
              })

            ]
          }
        },
        {
          text: "Doctor Comments: ", style: "subheader", margin: [0, 30]
        },
        {
          text: this.medicalTest.doctorComments,
        },
        {
          text: "Prescription: ", style: "subheader", margin: [0, 30]
        },
        {
          text: this.medicalTest.otherInfo
        },
      ],
      styles: {
        header: {
          fontSize: 20,
          bold: true,
          alignment: "justify",
          lineHeight: 2
        },
        bold: {
          fontSize: 14,
          bold: true,
          alignment: "justify",
          lineHeight: 2
        },
        normal: {
          fontSize: 14,
          alignment: "justify",
          lineHeight: 2
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        defaultStyle: {
          columnGap: 20
        }
      }
    };
    pdfMake.createPdf(documentDefinition).download('TestReport_' + this.medicalTest.reportId);
  }
}
