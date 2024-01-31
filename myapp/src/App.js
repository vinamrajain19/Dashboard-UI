import * as React from "react";
import "./App.css";
// import './styles.js';
import styled from "styled-components";
import Chart from "chart.js/auto";
import { useEffect, useRef } from "react";
import cvjson from './csvjson.json';

const GraphComponent = () => {
  const chartRef = useRef(null);

  const data = cvjson;
  // console.log(data);

  // Downsampling algorithm
  function downsampleLTTB(data, threshold) {
    var data_length = data.length;

    if (threshold >= data_length || threshold === 0) {
      return data; // Nothing to do
    }

    var sampled = [];
    var sampled_index = 0;

    // Bucket size. Leave room for start and end data points
    var every = (data_length - 2) / (threshold - 2);

    var a = 0, // Initially a is the first point in the triangle
      max_area_point,
      max_area,
      area,
      next_a;

    sampled[sampled_index++] = data[a]; // Always add the first point

    for (var i = 0; i < threshold - 2; i++) {
      // Calculate point average for the next bucket (containing c)
      var avg_month = 0,
        avg_profit_percentage = 0,
        avg_range_start = Math.floor((i + 1) * every) + 1,
        avg_range_end = Math.floor((i + 2) * every) + 1;

      avg_range_end = avg_range_end < data_length ? avg_range_end : data_length;

      var avg_range_length = avg_range_end - avg_range_start;

      for (; avg_range_start < avg_range_end; avg_range_start++) {
        // Extract the month from the timestamp string
        var month = parseInt(data[avg_range_start]["Timestamp"].substring(5, 7), 10);
        avg_month += month;
        avg_profit_percentage += data[avg_range_start]["Profit Percentage"] * 1;
      }

      avg_month /= avg_range_length;
      avg_profit_percentage /= avg_range_length;

      // Get the range for this bucket
      var range_offs = Math.floor((i + 0) * every) + 1,
        range_to = Math.floor((i + 1) * every) + 1;

      // Point a
      var point_a_month = parseInt(data[a]["Timestamp"].substring(5, 7), 10);
      var point_a_profit_percentage = data[a]["Profit Percentage"] * 1;

      max_area = area = -1;

      for (; range_offs < range_to; range_offs++) {
        // Calculate triangle area over three buckets
        area = Math.abs(
          (point_a_month - avg_month) * (data[range_offs]["Profit Percentage"] - point_a_profit_percentage) -
          (point_a_month - parseInt(data[range_offs]["Timestamp"].substring(5, 7), 10)) * (avg_profit_percentage - point_a_profit_percentage)
        ) * 0.5;

        if (area > max_area) {
          max_area = area;
          max_area_point = data[range_offs];
          next_a = range_offs; // Next a is this b
        }
      }

      sampled[sampled_index++] = max_area_point; // Pick this point from the bucket
      a = next_a; // This a is the next a (chosen b)
    }

    sampled[sampled_index++] = data[data_length - 1]; // Always add the last

    return sampled;
  }


  // Example usage with your JSON data

  // Set the downsampling threshold
  const threshold = 100; // Adjust the threshold as needed

  // Sort the data by timestamp (assuming it's not sorted)
  data.sort((a, b) => new Date(a.Timestamp) - new Date(b.Timestamp));

  // Downsample the data
  //console.log(data);
  const downsampledData = downsampleLTTB(data, threshold);

  // Now downsampledData contains the sampled data points
  console.log(downsampledData);


  useEffect(() => {
    // Sample data for the graph
    // Extract labels (years) and data (profit percentages) from sampled data
    const labels = downsampledData.map(dataPoint => dataPoint["Timestamp"].substring(0, 7)); // Extracting year-month
    const dataValues = downsampledData.map(dataPoint => dataPoint["Profit Percentage"]);

    const data = {
      labels: labels,
      datasets: [
        {
          label: "Profit Percentage",
          data: dataValues,
          borderColor: "rgba(255, 205, 113, 1)",
          backgroundColor: "rgba(255, 205, 113, 0.2)",
          fill: true,
          borderDash: [5, 2],
        },
      ],
    };

    const options = {
      scales: {
        x: {
          type: "category", // Use category scale for months
          labels: labels,
          position: "bottom",
        },
        y: {
          min: 0,
          max: 50,
          stepSize: 5,
        },
      },
    };

    const ctx = chartRef.current.getContext("2d");

    // Create the chart
    const myChart = new Chart(ctx, {
      type: "line",
      data: data,
      options: options,
    });

    // Cleanup when the component is unmounted
    return () => myChart.destroy();


  }, []);

  return (
    <Div134>
      <canvas ref={chartRef} />
    </Div134 >
  );
};

export default function App(props) {
  const style = {
    '--percentage': 80,
    '--fill': '#FFCD71',
  };
  return (
    <Div>
      <Div2>
        <Column>
          <Div3>
            <Div4>
              <Div5>
                <Div6>
                  <Img loading="lazy" srcSet="..." />
                </Div6>
                <Img2
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/53765354a320d793dc1aeade967e1d57834cd564c191db6c8d86a7207f6fc2f2?"
                />
              </Div5>
            </Div4>
            <Div7>
              <Div8>
                <Img3
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/28a045fab0378a4eaf6a584bab0c6e25f7d3f7a08ad7478e219d9dc2b5e96166?"
                />
                <Div9>Search</Div9>
              </Div8>
              <Div10>
                <Img4
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/1787ebe188d8d5a22c0d4108bc07b403118dccbdcb3861e47fe373a36bbf3de4?"
                />
                <Div11>Dashboard</Div11>
              </Div10>
              <Div12>
                <Img5
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/eae0cc76c0b9b0e0cd089a4330f78291fb24f13e0ee93098d257205eead3bf2f?"
                />
                <Div13>Customers</Div13>
              </Div12>
              <Div14>
                <Img6
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/b00501cb6d003b0c085517ed7efcd45631034f801597de039ef6b6bb88c01365?"
                />
                <Div15>All reports</Div15>
              </Div14>
              <Div16>
                <Img7
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/30d3ffa21c72e8b30fc51d772b6ce59b35a50b2a20b7908bea5f9f0ed14b638c?"
                />
                <Div17>Geography</Div17>
              </Div16>
              <Div18>
                <Img8
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/d15b9230e9ae973b41432fde4b55c74fc7ae9c59a3d4fc8a670fd9103cf1a71a?"
                />
                <Div19>Conversations</Div19>
              </Div18>
              <Div20>
                <Img9
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/15a2c1768abb5f6ccd9a010880f2185ee9535d79961313f14f1d5b5f76b1f53e?"
                />
                <Div21>Deals</Div21>
              </Div20>
              <Div22>
                <Img10
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/bf4f03d423c98514863f4f697c8f1125a2a8f451cc30117e82d9de220097f9ec?"
                />
                <Div23>Export</Div23>
              </Div22>
            </Div7>
            <Div24>
              <Div25>
                <Img11
                  loading="lazy"
                  src="https://a.storyblok.com/f/191576/1200x800/215e59568f/round_profil_picture_after_.webp"
                />
                <Div26>
                  <Div27>Gustavo Xavier</Div27>
                  <Div28>Admin</Div28>
                </Div26>
              </Div25>
              <Div29>
                <Img12
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/1be99f9292aa8f30300ada48f9bd16a26b18038269eef9940e9500f0c9a051c6?"
                />
                <Div30>Settings</Div30>
              </Div29>
              <Div31>
                <Img13
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/e4551f87f20ea46a5c40388f8fcc001f5a6c9170cedded3c0c0eb8dd100e229c?"
                />
                <Div32>Log out</Div32>
              </Div31>
            </Div24>
          </Div3>
        </Column>
        <Column2>
          <Div33>
            <Div34>
              <Div35>
                <Column3>
                  <Div36>
                    <Div37>Revenues</Div37>
                    <Div38>
                      <Div39>15%</Div39>
                      <Img14
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/7194159dc45904590c725cca7c61f0dd25ccacb851f551e39e27e0d010b8596c?"
                      />
                    </Div38>
                    <Div40>Increase compared to last week</Div40>
                    <Div41>
                      <Div42>Revenues report</Div42>
                      <Img15
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/2934408fdd779b8385ff7be36af90efe41725c4c91c087ed6f8db7d928754b9e?"
                      />
                    </Div41>
                  </Div36>
                </Column3>
                <Column4>
                  <Div43>
                    <Div44>Lost deals</Div44>
                    <Div45>4%</Div45>
                    <Div46>You closed 96 out of 100 deals</Div46>
                    <Div47>
                      <Div48>All deals</Div48>
                      <Img16
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/48dfa3848c4a447ba92ac7673e35c2bea0710b8f76946a80e9efffe411a9104a?"
                      />
                    </Div47>
                  </Div43>
                </Column4>
                <Column5>
                  <Div49>
                    <Div50>Quarter goal</Div50>
                    <Div51>
                      {/* <Img17
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/0656ad583ac31d9aeaa02a3724469b271711a24fe2da4279e4521b7729fddcac?"
                      />
                      <Div52>
                        <Img18
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/9b4e4cfce6c0276bef0f80b6949f741334d31a412d2697ba8e42fb42d4bafcec?"
                        />
                        <Img19
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/261a2d3a9792a33bb7f903504dcc8114af68e55d08ac68b00ae508fb28a316dd?"
                        />
                        <Div53>84%</Div53>
                      </Div52> */}
                      <div className="meter">
                        <div className="semi-donut margin" style={style}>
                          84%
                        </div>

                      </div>




                    </Div51>
                    <Div54>
                      <Div55>All goals</Div55>
                      <Img20
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/6a327f72255fc92b0a38e4c319a67f75f095f830f1d5c587c85b72a1a9d41467?"
                      />
                    </Div54>
                  </Div49>
                </Column5>
              </Div35>
            </Div34>
            <Div56>
              <Div57>
                <Column6>
                  <Div58>
                    <Div59>
                      <Div60>Customers</Div60>
                      <Div61>
                        <Div62>
                          <span style={{ color: "rgba(69,69,69,1)" }}>
                            Sort by{" "}
                          </span>
                          <span
                            style={{
                              fontWeight: 500,
                              color: "rgba(69,69,69,1)",
                            }}
                          >
                            Newest
                          </span>
                        </Div62>
                        <Img21
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/caa9a54f827724dc9c6b6171ec4a846b3d8193bf19754a05eaf53e0691347eda?"
                        />
                      </Div61>
                    </Div59>
                    <Div63>
                      <Div64>
                        <Img22
                          loading="lazy"
                          src="https://a.storyblok.com/f/191576/1200x800/215e59568f/round_profil_picture_after_.webp"
                        />
                        <Div65>
                          <Div66>Chris Friedkly</Div66>
                          <Div67>Supermarket Villanova</Div67>
                        </Div65>
                      </Div64>
                      <Div68>
                        <Img23
                          loading="lazy"
                          src="https://a.storyblok.com/f/191576/1200x800/215e59568f/round_profil_picture_after_.webp"
                        />
                        <Div69>
                          <Div70>Maggie Johnson</Div70>
                          <Div71>Oasis Organic Inc.</Div71>
                        </Div69>
                        <Div72>
                          <Div73>
                            <Img24
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/6b32b25326e1dc552774950056935beb2df6526ff5d87a99934c4511c87aacd7?"
                            />
                            <Img25
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/073142bf71d169b514267f7c8c08c68adad97025b1d424036f8bd9388ab02455?"
                            />
                            <Img26
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/e6a9d718afad6685daf92242ed31eecfb6eea7fb89620a26daf58a778bb1f1a7?"
                            />
                          </Div73>
                          <Img27
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/8f083280dcc09c69bdfecc44092d7d8f53c1c6249ba3ab02180e46d9238160f0?"
                          />
                        </Div72>
                      </Div68>
                      <Div74>
                        <Img28
                          loading="lazy"
                          src="https://a.storyblok.com/f/191576/1200x800/215e59568f/round_profil_picture_after_.webp"
                        />
                        <Div75>
                          <Div76>Gael Harry</Div76>
                          <Div77>New York Finest Fruits</Div77>
                        </Div75>
                      </Div74>
                      <Div78>
                        <Img29
                          loading="lazy"
                          src="https://a.storyblok.com/f/191576/1200x800/215e59568f/round_profil_picture_after_.webp"
                        />
                        <Div79>
                          <Div80>Jenna Sullivan</Div80>
                          <Div81>Walmart</Div81>
                        </Div79>
                      </Div78>
                    </Div63>
                    <Div82>
                      <Div83>All customers</Div83>
                      <Img30
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/6a19de1de8fd5a7a5e9e55a2ca0b13478563d04675d04421f200ce6d981e9126?"
                      />
                    </Div82>
                  </Div58>
                </Column6>
                <Column7>
                  <Div84>
                    <GraphComponent />
                    <Div98>
                      <Div99>
                        <Column8>
                          <Div100>
                            <Div101>Top month</Div101>
                            <Div102>November</Div102>
                            <Div103>2019</Div103>
                          </Div100>
                        </Column8>
                        <Column9>
                          <Div104>
                            <Div105>Top year</Div105>
                            <Div106>2023</Div106>
                            <Div107>96K sold so far</Div107>
                          </Div104>
                        </Column9>
                        <Column10>
                          <Div108>
                            <Div109>Top buyer</Div109>
                            <Img33
                              loading="lazy"
                              src="https://a.storyblok.com/f/191576/1200x800/215e59568f/round_profil_picture_after_.webp"
                            />
                            <Div110>Maggie Johnson</Div110>
                            <Div111>Oasis Organic Inc.</Div111>
                          </Div108>
                        </Column10>
                      </Div99>
                    </Div98>
                  </Div84>
                </Column7>
              </Div57>
            </Div56>
            <Div112>
              <Div113>
                <Column11>
                  <Div114>
                    <Div115>Chats</Div115>
                    <Div116>2 unread messages</Div116>
                    <Div117>
                      <Div118>
                        <Img34
                          loading="lazy"
                          src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        />
                      </Div118>
                      <Div119>
                        <Img35
                          loading="lazy"
                          src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        />
                      </Div119>
                      <Div1111>
                        <Img36
                          loading="lazy"
                          src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        />
                      </Div1111>
                      <Div1112>
                        <Img37
                          loading="lazy"
                          src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        />
                      </Div1112>
                    </Div117>
                  </Div114>
                </Column11>
                <Column12>
                  <Div120>
                    <Div121>Top states</Div121>
                    <Div122>
                      <Div123>NY</Div123>
                      <Div124>120k</Div124>
                    </Div122>
                    <Div125>
                      <Div126>MA</Div126>
                      <Div127>80k</Div127>
                    </Div125>
                    <Div128>
                      <Div129>NH</Div129>
                      <Div130>70k</Div130>
                    </Div128>
                    <Div131>
                      <Div132>OR</Div132>
                      <Div133>50k</Div133>
                    </Div131>
                  </Div120>
                </Column12>
                <Column13>
                  <Div134>
                    <Div135>New deals</Div135>
                    <Div136>
                      <Div137>
                        <Img38
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/4219cac92fcf2db058270e1848e7de5bde65403b0f63a695adc3628a3a90c319?"
                        />
                        <Div138>Fruit2Go</Div138>
                      </Div137>
                      <Div139>
                        <Img39
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/4219cac92fcf2db058270e1848e7de5bde65403b0f63a695adc3628a3a90c319?"
                        />
                        <Div140>Marshall's MKT</Div140>
                      </Div139>{" "}
                      <Div141>
                        <Img40
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/4219cac92fcf2db058270e1848e7de5bde65403b0f63a695adc3628a3a90c319?"
                        />{" "}
                        <Div142>CCNT</Div142>
                      </Div141>


                      <Div144>
                        <Img41
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/4219cac92fcf2db058270e1848e7de5bde65403b0f63a695adc3628a3a90c319?"
                        />{" "}
                        <Div145>Joana Mini-market</Div145>
                      </Div144>{" "}
                      <Div146>
                        <Img42
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/4219cac92fcf2db058270e1848e7de5bde65403b0f63a695adc3628a3a90c319?"
                        />{" "}
                        <Div147>Little Brazil Vegan</Div147>
                      </Div146>

                      <Div137>
                        <Img38
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/4219cac92fcf2db058270e1848e7de5bde65403b0f63a695adc3628a3a90c319?"
                        />
                        <Div138>Target</Div138>
                      </Div137>
                      <Div139>
                        <Img39
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/4219cac92fcf2db058270e1848e7de5bde65403b0f63a695adc3628a3a90c319?"
                        />
                        <Div140>Organic Place</Div140>
                      </Div139>{" "}
                      <Div141>
                        <Img40
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/4219cac92fcf2db058270e1848e7de5bde65403b0f63a695adc3628a3a90c319?"
                        />{" "}
                        <Div142>Morello's</Div142>
                      </Div141>
                    </Div136>{" "}

                    {/* <Div148>
                      <Div149/> <Div150 /> <Div151 />
                    </Div148> */}
                  </Div134>
                </Column13>
              </Div113>
            </Div112>
          </Div33>
        </Column2>
      </Div2>
    </Div>
  );
}
const Div = styled.div`
  border-radius: 32px;
  background-color: var(--Off-White, #f6f6f3);
  padding: 16px;
`;
const Div2 = styled.div`
  gap: 20px;
  display: flex;
  @media (max-width: 991px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0px;
  }
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  line-height: normal;
  width: 20%;
  margin-left: 0px;
  @media (max-width: 991px) {
    width: 100%;
  }
`;
const Div3 = styled.div`
  max-width: 320px;
  align-self: stretch;
  border-radius: 16px;
  background-color: var(--White, #fff);
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  width: 100%;
  @media (max-width: 991px) {
    margin-top: 32px;
  }
`;
const Div4 = styled.div`
  justify-content: center;
  align-items: start;
  display: flex;
  flex-direction: column;
  padding: 14px 60px 14px 24px;
  @media (max-width: 991px) {
    padding: 0 20px;
  }
`;
const Div5 = styled.div`
  justify-content: center;
  display: flex;
  gap: 6px;
  padding: 8px 0;
`;
const Div6 = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  aspect-ratio: 1.05;
  flex-direction: column;
  margin: auto 0;
`;
const Img = styled.img`
  aspect-ratio: 1.05;
  object-fit: contain;
  object-position: center;
  width: 21px;
  border-radius: 50%;
`;
const Img2 = styled.img`
  aspect-ratio: 5;
  object-fit: contain;
  object-position: center;
  width: 121px;
  max-width: 100%;
`;
const Div7 = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 8px 50px;
`;
const Div8 = styled.div`
  // align-self: center;
  border-radius: 20px;
  border: 1px solid var(--Light-Gray, #f1f1f1);
  background-color: var(--White, #ffffff);
  display: flex;
  gap: 12px;
  justify-content: space-between;
  padding: 12px 20px;
  margin: 0 0 0 10px;
`;
const Img3 = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 16px;
`;
const Div9 = styled.div`
  color: var(--Mid-Gray, #7d7d7d);
  letter-spacing: -0.25px;
  flex-grow: 1;
  flex-basis: auto;
  font: 400 14px/100% Inter, sans-serif;
`;
const Div10 = styled.div`
  border-radius: 24px;
  display: flex;
  margin-top: 20px;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 20px;
`;
const Img4 = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 16px;
`;
const Div11 = styled.div`
  color: var(--Black, #131313);
  letter-spacing: -0.25px;
  flex-grow: 1;
  font: 400 14px/100% Inter, sans-serif;
`;
const Div12 = styled.div`
  border-radius: 24px;
  display: flex;
  margin-top: 8px;
  justify-content: space-between;
  gap: 12px;
  padding: 13px 20px;
`;
const Img5 = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 16px;
`;
const Div13 = styled.div`
  color: var(--Black, #131313);
  letter-spacing: -0.25px;
  flex-grow: 1;
  font: 400 14px/100% Inter, sans-serif;
`;
const Div14 = styled.div`
  border-radius: 24px;
  display: flex;
  margin-top: 8px;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 20px;
`;
const Img6 = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 16px;
`;
const Div15 = styled.div`
  color: var(--Black, #131313);
  letter-spacing: -0.25px;
  flex-grow: 1;
  white-space: nowrap;
  font: 400 14px/100% Inter, sans-serif;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;
const Div16 = styled.div`
  border-radius: 24px;
  display: flex;
  margin-top: 8px;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 20px;
`;
const Img7 = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 16px;
`;
const Div17 = styled.div`
  color: var(--Black, #131313);
  letter-spacing: -0.25px;
  flex-grow: 1;
  font: 400 14px/100% Inter, sans-serif;
`;
const Div18 = styled.div`
  border-radius: 24px;
  display: flex;
  margin-top: 8px;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 20px;
`;
const Img8 = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 16px;
`;
const Div19 = styled.div`
  color: var(--Black, #131313);
  letter-spacing: -0.25px;
  flex-grow: 1;
  font: 400 14px/100% Inter, sans-serif;
`;
const Div20 = styled.div`
  border-radius: 24px;
  display: flex;
  margin-top: 8px;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 20px;
`;
const Img9 = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 16px;
`;
const Div21 = styled.div`
  color: var(--Black, #131313);
  letter-spacing: -0.25px;
  flex-grow: 1;
  font: 400 14px/100% Inter, sans-serif;
`;
const Div22 = styled.div`
  border-radius: 24px;
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin: 8px 0 146px;
  padding: 12px 20px;
  @media (max-width: 991px) {
    margin-bottom: 40px;
  }
`;
const Img10 = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 16px;
`;
const Div23 = styled.div`
  color: var(--Black, #131313);
  letter-spacing: -0.25px;
  flex-grow: 1;
  font: 400 14px/100% Inter, sans-serif;
`;
const Div24 = styled.div`
  justify-content: flex-end;
  display: flex;
  flex-direction: column;
  padding: 23px 8px;
`;
const Div25 = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 2px 80px 2px 5px;
  @media (max-width: 991px) {
    padding-right: 20px;
  }
`;
const Img11 = styled.img`
  // aspect-ratio: 1;
  // object-fit: contain;
  // object-position: center;
  // width: 32px;
  // justify-content: center;
  // align-items: center;
  // margin: auto 0;

  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 45%;
  border-radius: 50%;
  //width: 32px;
  justify-content: center;
  align-items: center;
`;
const Div26 = styled.div`
  justify-content: center;
  display: flex;
  flex-grow: 1;
  flex-basis: 0%;
  flex-direction: column;
`;
const Div27 = styled.div`
  color: var(--Black, #131313);
  letter-spacing: -0.25px;
  white-space: nowrap;
  font: 500 14px Inter, sans-serif;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;
const Div28 = styled.div`
  color: var(--Black, #131313);
  letter-spacing: -0.5px;
  justify-content: center;
  border-radius: 24px;
  background-color: var(--Mid-Orange, #ffcd71);
  margin-top: 4px;
  padding: 0 6px;
  font: 400 10px/160% Inter, sans-serif;
`;
const Div29 = styled.div`
  border-radius: 24px;
  display: flex;
  margin-top: 12px;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 20px;
`;
const Img12 = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 16px;
`;
const Div30 = styled.div`
  color: var(--Black, #131313);
  letter-spacing: -0.25px;
  flex-grow: 1;
  font: 400 14px/100% Inter, sans-serif;
`;
const Div31 = styled.div`
  border-radius: 24px;
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 20px;
`;
const Img13 = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 16px;
`;
const Div32 = styled.div`
  color: var(--Dark-Red, #b01212);
  letter-spacing: -0.25px;
  flex-grow: 1;
  white-space: nowrap;
  font: 400 14px/100% Inter, sans-serif;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;
const Column2 = styled.div`
  display: flex;
  flex-direction: column;
  line-height: normal;
  width: 80%;
  margin-left: 20px;
  @media (max-width: 991px) {
    width: 100%;
  }
`;
const Div33 = styled.div`
  align-self: stretch;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 32px;
  }
`;
const Div34 = styled.div`
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;
const Div35 = styled.div`
  gap: 16px;
  display: flex;
  justify-content: space-between;
  @media (max-width: 991px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0px;
  }
`;
const Column3 = styled.div`
  display: flex;
  //flex-direction: column;
  line-height: normal;
  width: 35%;
  // margin-left: 0px;
  @media (max-width: 991px) {
    width: 100%;
  }
`;
const Div36 = styled.div`
  align-items: start;
  align-self: stretch;
  border-radius: 16px;
  background-color: var(--White, #ffffff);
  display: flex;
  width: 100%;
  flex-grow: 1;
  flex-direction: column;
  margin: 0 auto;
  padding: 24px 80px 24px 24px;
  @media (max-width: 991px) {
    margin-top: 16px;
    padding: 0 20px;
  }
`;
const Div37 = styled.div`
  color: var(--Black, #131313);
  letter-spacing: -0.2px;
  font: 600 20px Inter, sans-serif;
`;
const Div38 = styled.div`
  display: flex;
  margin-top: 24px;
  padding-right: 19px;
  gap: 8px;
`;
const Div39 = styled.div`
  color: var(--Black, #131313);
  letter-spacing: -2px;
  flex-grow: 1;
  flex-basis: auto;
  font: 500 48px Inter, sans-serif;
  @media (max-width: 991px) {
    font-size: 40px;
  }
`;
const Img14 = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 32px;
  margin: auto 0;
`;
const Div40 = styled.div`
  color: var(--Dark-Gray, #454545);
  letter-spacing: -0.3px;
  margin-top: 8px;
  white-space: nowrap;
  font: 400 14px Inter, sans-serif;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;
const Div41 = styled.div`
  display: flex;
  margin-top: 66px;
  padding-right: 9px;
  gap: 4px;
  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;
const Div42 = styled.div`
  color: var(--Dark-Orange, #734a00);
  letter-spacing: -0.3px;
  flex-grow: 1;
  flex-basis: auto;
  font: 400 14px Inter, sans-serif;
`;
const Img15 = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 14px;
  align-self: start;
`;
const Column4 = styled.div`
  display: flex;
  //flex-direction: column;
  line-height: normal;
  width: 35%;
  // margin-left: 20px;
  @media (max-width: 991px) {
    width: 100%;
  }
`;
const Div43 = styled.div`
  align-items: start;
  align-self: stretch;
  border-radius: 16px;
  background-color: var(--White, #ffffff);
  display: flex;
  width: 100%;
  flex-grow: 1;
  flex-direction: column;
  color: var(--Black, #131313);
  margin: 0 auto;
  padding: 24px 80px 24px 24px;
  @media (max-width: 991px) {
    margin-top: 16px;
    padding: 0 20px;
  }
`;
const Div44 = styled.div`
  letter-spacing: -0.2px;
  font: 600 20px Inter, sans-serif;
`;
const Div45 = styled.div`
  letter-spacing: -2px;
  margin-top: 24px;
  font: 500 48px Inter, sans-serif;
  @media (max-width: 991px) {
    font-size: 40px;
  }
`;
const Div46 = styled.div`
  color: var(--Dark-Gray, #454545);
  letter-spacing: -0.3px;
  margin-top: 8px;
  white-space: nowrap;
  font: 400 14px Inter, sans-serif;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;
const Div47 = styled.div`
  display: flex;
  margin-top: 66px;
  padding-right: 26px;
  gap: 4px;
  @media (max-width: 991px) {
    padding-right: 20px;
    margin-top: 40px;
  }
`;
const Div48 = styled.div`
  color: var(--Dark-Orange, #734a00);
  letter-spacing: -0.3px;
  flex-grow: 1;
  flex-basis: auto;
  font: 400 14px Inter, sans-serif;
`;
const Img16 = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 14px;
  align-self: start;
`;
const Column5 = styled.div`
  display: flex;
  //flex-direction: column;
  line-height: normal;
  // width: 20%;
  // margin-left: 20px;
  @media (max-width: 991px) {
    width: 100%;
  }
`;
const Div49 = styled.div`
  align-items: center;
  align-self: stretch;
  border-radius: 16px;
  background-color: var(--White, #ffffff);
  display: flex;
  width: 100%;
  flex-grow: 1;
  flex-direction: column;
  margin: 0 auto;
  padding: 24px 25px;
  @media (max-width: 991px) {
    margin-top: 16px;
    padding: 0 20px;
  }
`;
const Div50 = styled.div`
  color: var(--Black, #131313);
  letter-spacing: -0.2px;
  white-space: nowrap;
  font: 600 20px Inter, sans-serif;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;
const Div51 = styled.div`
  disply: flex;
  flex-direction: column;
  fill: var(--Light-Orange, #fff7e8);
  overflow: hidden;
  position: relative;
  display: flex;
  aspect-ratio: 2.05;
  margin-top: 24px;
  width: 209px;
  padding-right: 23px;
  justify-content: center;
  align-items: center;
  @media (max-width: 991px) {
    padding-right: 20px;
  }
`;
const Img17 = styled.img`
  position: absolute;
  inset: 0;
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
`;
const Div52 = styled.div`
  disply: flex;
  flex-direction: column;
  position: relative;
  fill: var(--Mid-Orange, #ffcd71);
  overflow: hidden;
  display: flex;
  aspect-ratio: 1.82;
  padding-top: 32px;
  justify-content: space-between;
  gap: 20px;
`;
const Img18 = styled.img`
  position: absolute;
  inset: -20px;
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
`;
const Img19 = styled.img`
  aspect-ratio: 0.58;
  object-fit: contain;
  object-position: center;
  width: 41px;
  fill: #d9d9d9;
`;
const Div53 = styled.div`
  position: relative;
  color: var(--Black, #131313);
  text-align: center;
  letter-spacing: -1.59px;
  align-self: end;
  margin-top: 38px;
  flex-grow: 1;
  flex-basis: auto;
  font: 500 32px Inter, sans-serif;
`;
const Div54 = styled.div`
  display: flex;
  margin-top: 47px;
  gap: 4px;
  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;
const Div55 = styled.div`
  color: var(--Dark-Orange, #734a00);
  letter-spacing: -0.3px;
  flex-grow: 1;
  white-space: nowrap;
  font: 400 14px Inter, sans-serif;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;
const Img20 = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 14px;
  align-self: start;
`;
const Div56 = styled.div`
  margin-top: 16px;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;
const Div57 = styled.div`
  gap: 16px;
  display: flex;
  justify-content: space-between;
  @media (max-width: 991px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0px;
  }
`;
const Column6 = styled.div`
  display: flex;
  //flex-direction: column;
  line-height: normal;
  width: 48%;
  margin-left: 0px;
  @media (max-width: 991px) {
    width: 100%;
  }
`;
const Div58 = styled.div`
  border-radius: 16px;
  background-color: var(--White, #fff);
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  width: 100%;
  padding: 24px 0;
  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 16px;
  }
`;
const Div59 = styled.div`
  justify-content: space-between;
  display: flex;
  //width: 100%;
  gap: 20px;
  padding: 0 24px;
  @media (max-width: 991px) {
    max-width: 100%;
    flex-wrap: wrap;
    padding: 0 20px;
  }
`;
const Div60 = styled.div`
  color: var(--Black, #131313);
  letter-spacing: -0.2px;
  flex-grow: 1;
  flex-basis: auto;
  font: 600 20px Inter, sans-serif;
`;
const Div61 = styled.div`
  display: flex;
  gap: 4px;
  margin: auto 0;
`;
const Div62 = styled.div`
  color: var(--Dark-Gray, #454545);
  letter-spacing: -0.3px;
  flex-grow: 1;
  white-space: nowrap;
  font: 400 14px Inter, sans-serif;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;
const Img21 = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 14px;
  margin: auto 0;
`;
const Div63 = styled.div`
  display: flex;
  margin-top: 16px;
  flex-direction: column;
  padding: 0 8px 13px;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;
const Div64 = styled.div`
  border-radius: 16px;
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 16px;
  @media (max-width: 991px) {
    max-width: 100%;
    flex-wrap: wrap;
  }
`;
const Img22 = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 32px;
  justify-content: center;
  align-items: center;
  align-self: start;
`;
const Div65 = styled.div`
  justify-content: center;
  display: flex;
  flex-grow: 1;
  flex-basis: 0%;
  flex-direction: column;
  letter-spacing: -0.3px;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;
const Div66 = styled.div`
  color: var(--Black, #131313);
  font: 500 14px Inter, sans-serif;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;
const Div67 = styled.div`
  color: var(--Dark-Gray, #454545);
  font: 400 12px Inter, sans-serif;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;
const Div68 = styled.div`
  border-radius: 16px;
  background-color: var(--Light-Orange, #fff7e8);
  display: flex;
  gap: 12px;
  padding: 16px;
  @media (max-width: 991px) {
    max-width: 100%;
    flex-wrap: wrap;
  }
`;
const Img23 = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 32px;
  justify-content: center;
  align-items: center;
  margin: auto 0;
`;
const Div69 = styled.div`
  justify-content: center;
  align-self: start;
  display: flex;
  flex-grow: 1;
  flex-basis: 0%;
  flex-direction: column;
  letter-spacing: -0.3px;
`;
const Div70 = styled.div`
  color: var(--Black, #131313);
  font: 500 14px Inter, sans-serif;
`;
const Div71 = styled.div`
  color: var(--Dark-Gray, #454545);
  font: 400 12px Inter, sans-serif;
`;
const Div72 = styled.div`
  display: flex;
  padding-right: 10px;
  justify-content: space-between;
  gap: 20px;
`;
const Div73 = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 10px;
`;
const Img24 = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 16px;
`;
const Img25 = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 16px;
`;
const Img26 = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 16px;
`;
const Img27 = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 16px;
  margin: auto 0;
`;
const Div74 = styled.div`
  border-radius: 16px;
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 16px;
  @media (max-width: 991px) {
    max-width: 100%;
    flex-wrap: wrap;
  }
`;
const Img28 = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 32px;
  justify-content: center;
  align-items: center;
  align-self: start;
`;
const Div75 = styled.div`
  justify-content: center;
  display: flex;
  flex-grow: 1;
  flex-basis: 0%;
  flex-direction: column;
  letter-spacing: -0.3px;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;
const Div76 = styled.div`
  color: var(--Black, #131313);
  font: 500 14px Inter, sans-serif;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;
const Div77 = styled.div`
  color: var(--Dark-Gray, #454545);
  font: 400 12px Inter, sans-serif;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;
const Div78 = styled.div`
  border-radius: 16px;
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 16px;
  @media (max-width: 991px) {
    max-width: 100%;
    flex-wrap: wrap;
  }
`;
const Img29 = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 32px;
  justify-content: center;
  align-items: center;
  align-self: start;
`;
const Div79 = styled.div`
  justify-content: center;
  display: flex;
  flex-grow: 1;
  flex-basis: 0%;
  flex-direction: column;
  letter-spacing: -0.3px;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;
const Div80 = styled.div`
  color: var(--Black, #131313);
  font: 500 14px Inter, sans-serif;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;
const Div81 = styled.div`
  color: var(--Dark-Gray, #454545);
  font: 400 12px Inter, sans-serif;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;
const Div82 = styled.div`
  align-self: start;
  display: flex;
  gap: 4px;
  margin: 16px 0 0 24px;
  @media (max-width: 991px) {
    margin-left: 10px;
  }
`;
const Div83 = styled.div`
  color: var(--Dark-Orange, #734a00);
  letter-spacing: -0.3px;
  flex-grow: 1;
  white-space: nowrap;
  font: 400 14px Inter, sans-serif;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;
const Img30 = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 14px;
  align-self: start;
`;
const Column7 = styled.div`
  display: flex;
  //flex-direction: column;
  line-height: normal;
  width: 49%;
  // margin-left: 20px;
  @media (max-width: 991px) {
    width: 100%;
  }
`;
const Div84 = styled.div`
  align-self: stretch;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 16px;
  }
`;
const Div85 = styled.div`
  border-radius: 16px;
  background-color: var(--White, #fff);
  display: flex;
  flex-direction: column;
  padding: 24px;
  @media (max-width: 991px) {
    max-width: 100%;
    padding: 0 20px;
  }
`;
const Div86 = styled.div`
  padding-bottom: 16px;
  justify-content: space-between;
  display: flex;
  width: 100%;
  gap: 20px;
  @media (max-width: 991px) {
    max-width: 100%;
    flex-wrap: wrap;
  }
`;
const Div87 = styled.div`
  color: var(--Black, #131313);
  letter-spacing: -0.2px;
  font: 600 20px Inter, sans-serif;
`;
const Div88 = styled.div`
  align-self: start;
  display: flex;
  gap: 4px;
`;
const Div89 = styled.div`
  color: var(--Dark-Gray, #454545);
  letter-spacing: -0.3px;
  flex-grow: 1;
  font: 400 14px Inter, sans-serif;
`;
const Img31 = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 14px;
  margin: auto 0;
`;
const Div90 = styled.div`
  display: flex;
  margin-top: 8px;
  padding-right: 14px;
  justify-content: space-between;
  gap: 16px;
  @media (max-width: 991px) {
    max-width: 100%;
    flex-wrap: wrap;
  }
`;
const Div91 = styled.div`
  justify-content: space-between;
  align-self: start;
  display: flex;
  flex-basis: 0%;
  flex-direction: column;
  font-size: 10px;
  color: var(--Mid-Gray, #7d7d7d);
  font-weight: 500;
  white-space: nowrap;
  letter-spacing: -0.3px;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;
const Div92 = styled.div`
  font-family: Inter, sans-serif;
`;
const Div93 = styled.div`
  font-family: Inter, sans-serif;
  margin-top: 15px;
`;
const Div94 = styled.div`
  font-family: Inter, sans-serif;
  margin-top: 16px;
`;
const Div95 = styled.div`
  font-family: Inter, sans-serif;
  margin-top: 15px;
`;
const Div96 = styled.div`
  font-family: Inter, sans-serif;
  margin-top: 16px;
`;
const Div97 = styled.div`
  justify-content: center;
  display: flex;
  flex-grow: 1;
  flex-basis: 0%;
  flex-direction: column;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;
const Img32 = styled.img`
  aspect-ratio: 2.7;
  object-fit: contain;
  object-position: center;
  width: 100%;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;
const Div98 = styled.div`
  margin-top: 16px;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;
const Div99 = styled.div`
  gap: 16px;
  display: flex;
  justify-content: space-between;
  @media (max-width: 991px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0px;
  }
`;
const Column8 = styled.div`
  display: flex;
  //flex-direction: column;
  line-height: normal;
  //width: 33%;
  // margin-left: 0px;
  @media (max-width: 991px) {
    width: 100%;
  }
`;
const Div100 = styled.div`
  align-items: start;
  align-self: stretch;
  border-radius: 16px;
  background-color: var(--White, #fff);
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.2px;
  width: 100%;
  padding: 16px;
  @media (max-width: 991px) {
    margin-top: 16px;
  }
`;
const Div101 = styled.div`
  color: var(--Mid-Gray, #7d7d7d);
  font-family: Inter, sans-serif;
  letter-spacing: -0.4px;
  align-self: stretch;
`;
const Div102 = styled.div`
  color: var(--Dark-Orange, #734a00);
  margin-top: 29px;
  font: 24px Inter, sans-serif;
`;
const Div103 = styled.div`
  color: var(--Orange, #ffa500);
  font-family: Inter, sans-serif;
  font-weight: 500;
`;
const Column9 = styled.div`
  display: flex;
  //flex-direction: column;
  //line-height: normal;
  //width: 33%;
  // margin-left: 20px;
  @media (max-width: 991px) {
    width: 100%;
  }
`;
const Div104 = styled.div`
  align-items: start;
  align-self: stretch;
  border-radius: 16px;
  background-color: var(--White, #fff);
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  font-weight: 600;
  width: 100%;
  padding: 16px;
  @media (max-width: 991px) {
    margin-top: 16px;
  }
`;
const Div105 = styled.div`
  color: var(--Mid-Gray, #7d7d7d);
  letter-spacing: -0.4px;
  align-self: stretch;
  font: 16px Inter, sans-serif;
`;
const Div106 = styled.div`
  color: var(--Dark-Orange, #734a00);
  letter-spacing: -0.2px;
  margin-top: 27px;
  font: 24px Inter, sans-serif;
`;
const Div107 = styled.div`
  color: var(--Dark-Gray, #454545);
  letter-spacing: -0.3px;
  margin-top: 4px;
  white-space: nowrap;
  font: 400 14px Inter, sans-serif;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;
const Column10 = styled.div`
  display: flex;
  //flex-direction: column;
  line-height: normal;
  //width: 33%;
  // margin-left: 20px;
  @media (max-width: 991px) {
    width: 100%;
  }
`;
const Div108 = styled.div`
  align-items: start;
  align-self: stretch;
  border-radius: 16px;
  background-color: var(--White, #fff);
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  letter-spacing: -0.3px;
  width: 100%;
  padding: 16px;
  @media (max-width: 991px) {
    margin-top: 16px;
  }
`;
const Div109 = styled.div`
  color: var(--Mid-Gray, #7d7d7d);
  letter-spacing: -0.4px;
  align-self: stretch;
  font: 600 16px Inter, sans-serif;
`;
const Img33 = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  //width: 32px;
  justify-content: center;
  align-items: center;
`;
const Div110 = styled.div`
  color: var(--Black, #131313);
  margin-top: 8px;
  white-space: nowrap;
  font: 500 12px Inter, sans-serif;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;
const Div111 = styled.div`
  color: var(--Dark-Gray, #454545);
  margin-top: 4px;
  white-space: nowrap;
  font: 400 10px Inter, sans-serif;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;
const Div112 = styled.div`
  margin-top: 16px;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;
const Div113 = styled.div`
  gap: 16px;
  display: flex;
  justify-content: space-between;
  @media (max-width: 991px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0px;
  }
`;
const Column11 = styled.div`
  display: flex;
  //flex-direction: column;
  line-height: normal;
  width: 30%;
  // margin-left: 0px;
  @media (max-width: 991px) {
    width: 100%;
  }
`;
const Div114 = styled.div`
  align-self: stretch;
  border-radius: 16px;
  background-color: var(--White, #ffffff);
  display: flex;
  width: 100%;
  flex-grow: 1;
  flex-direction: column;
  margin: 0 auto;
  padding: 24px 24px 43px;
  @media (max-width: 991px) {
    margin-top: 16px;
    padding: 0 20px;
  }
`;
const Div115 = styled.div`
  color: var(--Black, #131313);
  letter-spacing: -0.2px;
  font: 600 20px Inter, sans-serif;
`;
const Div116 = styled.div`
  color: var(--Dark-Gray, #454545);
  letter-spacing: -0.3px;
  margin-top: 8px;
  // margin-bottom:8px;
  font: 400 14px Inter, sans-serif;
`;
const Div117 = styled.div`
  align-items: center;
  flex-wrap: wrap;
  display: flex;
  margin-top: 24px;
  // padding-right: 36px;
  justify-content: space-between;
  gap: 8px;
  @media (max-width: 991px) {
    padding-right: 20px;
  }
`;
const Div118 = styled.div`
  align-items: center;
  border-radius: 16px;
  background-color: var(--Light-Orange, #fff7e8);
  display: flex;
  aspect-ratio: 1;
  flex-direction: column;
  justify-content: center;
  width: 50px;
  height: 50px;
  padding: 0 10px;
`;
const Img34 = styled.img`
  // aspect-ratio: 1;
  // object-fit: contain;
  // object-position: center;
  // width: 90%;
  // border-radius:50%;
  // justify-content: center;
  // align-items: center;

  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 65%;
  border-radius: 50%;
  //width: 32px;
  justify-content: center;
  align-items: center;
`;
const Div119 = styled.div`
  align-items: center;
  border-radius: 16px;
  background-color: var(--Light-Orange, #fff7e8);
  display: flex;
  aspect-ratio: 1;
  flex-direction: column;
  justify-content: center;
  width: 50px;
  height: 50px;
  padding: 0 10px;
`;
const Img35 = styled.img`
  // aspect-ratio: 1;
  // object-fit: contain;
  // object-position: center;
  // width: 90%;
  // border-radius:50%;

  // justify-content: center;
  // align-items: center;

  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 65%;
  border-radius: 50%;
  //width: 32px;
  justify-content: center;
  align-items: center;
`;
const Img36 = styled.img`
  // width: 100%;
  // height: 100%;
  // object-fit: contain;
  // object-position: center;

  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 65%;
  border-radius: 50%;
  //width: 32px;
  justify-content: center;
  align-items: center;
`;
const Img37 = styled.img`
  // width: 100%;
  // height: 100%;
  // object-fit: contain;
  // object-position: center;

  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 65%;
  border-radius: 50%;
  //width: 32px;
  justify-content: center;
  align-items: center;
`;
const Column12 = styled.div`
  display: flex;
  //flex-direction: column;
  line-height: normal;
  width: 30%;
  // margin-left: 20px;
  @media (max-width: 991px) {
    width: 100%;
  }
`;
const Div120 = styled.div`
  align-self: stretch;
  border-radius: 16px;
  background-color: var(--White, #fff);
  display: flex;
  width: 100%;
  flex-grow: 1;
  flex-direction: column;
  color: var(--Black, #131313);
  margin: 0 auto;
  padding: 24px 24px 0;
  @media (max-width: 991px) {
    margin-top: 16px;
    padding: 0 20px;
  }
`;
const Div121 = styled.div`
  letter-spacing: -0.2px;
  font: 600 20px Inter, sans-serif;
`;
const Div122 = styled.div`
  justify-content: space-between;
  border-radius: 4px;
  background: linear-gradient(
    90deg,
    #ffcd71 -2.57%,
    rgba(255, 205, 113, 0) 112.5%
  );
  display: flex;
  margin-top: 24px;
  gap: 20px;
  white-space: nowrap;
  text-transform: uppercase;
  padding: 6px 8px;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;
const Div123 = styled.div`
  font: 600 14px Inter, sans-serif;
`;
const Div124 = styled.div`
  text-align: right;
  margin: auto 0;
  font: 500 10px Inter, sans-serif;
`;
const Div125 = styled.div`
  justify-content: space-between;
  border-radius: 4px;
  background: linear-gradient(
    90deg,
    #ffcd71 -2.57%,
    rgba(255, 205, 113, 0) 112.5%
  );
  display: flex;
  margin-top: 8px;
  gap: 20px;
  white-space: nowrap;
  text-transform: uppercase;
  padding: 6px 10px;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;
const Div126 = styled.div`
  font: 600 14px Inter, sans-serif;
`;
const Div127 = styled.div`
  text-align: right;
  margin: auto 0;
  font: 500 10px Inter, sans-serif;
`;
const Div128 = styled.div`
  justify-content: space-between;
  border-radius: 4px;
  background: linear-gradient(
    90deg,
    #ffcd71 -2.57%,
    rgba(255, 205, 113, 0) 112.5%
  );
  display: flex;
  margin-top: 8px;
  gap: 20px;
  white-space: nowrap;
  text-transform: uppercase;
  padding: 6px 11px;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;
const Div129 = styled.div`
  font: 600 14px Inter, sans-serif;
`;
const Div130 = styled.div`
  text-align: right;
  margin: auto 0;
  font: 500 10px Inter, sans-serif;
`;
const Div131 = styled.div`
  justify-content: space-between;
  border-radius: 4px;
  background: linear-gradient(
    90deg,
    #ffcd71 -2.57%,
    rgba(255, 205, 113, 0) 112.5%
  );
  display: flex;
  margin-top: 8px;
  gap: 20px;
  white-space: nowrap;
  text-transform: uppercase;
  padding: 6px 15px 0;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;
const Div132 = styled.div`
  font: 600 14px Inter, sans-serif;
`;
const Div133 = styled.div`
  text-align: right;
  flex-grow: 1;
  flex-basis: auto;
  font: 500 10px Inter, sans-serif;
`;
const Column13 = styled.div`
  display: flex;
  //flex-direction: column;
  flex-wrap: wrap;
  line-height: normal;
  width: 40%;
  ? @media (max-width: 991px) {
    width: 100%;
  }
`;
const Div134 = styled.div`
  align-self: stretch;
  border-radius: 16px;
  background-color: var(--White, #fff);
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  width: 100%;
  padding: 15px 24px 0;
  padding-bottom: 30px;
  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 16px;
    padding: 0 20px;
  }
`;
const Div135 = styled.div`
  color: var(--Black, #131313);
  letter-spacing: -0.2px;
  font: 600 20px Inter, sans-serif;
  margin-bottom:24px;
`;
const Div136 = styled.div`
  display: flex;
  flex-wrap:wrap;
  // margin-top: 24px;
  justify-content: space-between;
  gap: 8px;
  @media (max-width: 991px) {
    margin-right: 4px;
  }
`;
const Div137 = styled.div`
  justify-content: space-between;
  border-radius: 16px;
  background-color: var(--Light-Orange, #fff7e8);
  display: flex;
  gap: 8px;
  padding: 12px;
`;
const Img38 = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 24px;
`;
const Div138 = styled.div`
  color: var(--Dark-Orange, #734a00);
  letter-spacing: -0.3px;
  flex-grow: 1;
  margin: auto 0;
  font: 400 14px Inter, sans-serif;
`;
const Div139 = styled.div`
  justify-content: space-between;
  border-radius: 16px;
  background-color: var(--Light-Orange, #fff7e8);
  display: flex;
  gap: 8px;
  padding: 12px;
`;
const Img39 = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 24px;
`;
const Div140 = styled.div`
  color: var(--Dark-Orange, #734a00);
  letter-spacing: -0.3px;
  flex-grow: 1;
  white-space: nowrap;
  margin: auto 0;
  font: 400 14px Inter, sans-serif;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;
const Div141 = styled.div`
  justify-content: space-between;
  border-radius: 16px;
  background-color: var(--Light-Orange, #fff7e8);
  display: flex;
  gap: 8px;
  padding: 12px;
`;
const Img40 = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 24px;
`;
const Div142 = styled.div`
  color: var(--Dark-Orange, #734a00);
  letter-spacing: -0.3px;
  margin: auto 0;
  font: 400 14px Inter, sans-serif;
`;
const Div143 = styled.div`
  display: flex;
  margin-top: 8px;
  justify-content: space-between;
  gap: 8px;
  @media (max-width: 991px) {
    margin-right: 4px;
  }
`;
const Div144 = styled.div`
  justify-content: space-between;
  border-radius: 16px;
  background-color: var(--Light-Orange, #fff7e8);
  display: flex;
  gap: 8px;
  padding: 12px 13px;
`;
const Img41 = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 24px;
`;
const Div145 = styled.div`
  color: var(--Dark-Orange, #734a00);
  letter-spacing: -0.3px;
  flex-grow: 1;
  white-space: nowrap;
  margin: auto 0;
  font: 400 14px Inter, sans-serif;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;
const Div146 = styled.div`
  justify-content: space-between;
  border-radius: 16px;
  background-color: var(--Light-Orange, #fff7e8);
  display: flex;
  gap: 8px;
  padding: 12px 13px;
`;
const Img42 = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 24px;
`;
const Div147 = styled.div`
  color: var(--Dark-Orange, #734a00);
  letter-spacing: -0.3px;
  flex-grow: 1;
  white-space: nowrap;
  margin: auto 0;
  font: 400 14px Inter, sans-serif;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;
const Div148 = styled.div`
  display: flex;
  margin-top: 8px;
  justify-content: space-between;
  gap: 8px;
  @media (max-width: 991px) {
    margin-right: 9px;
  }
`;
const Div149 = styled.div`
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  background-color: var(--Light-Orange, #fff7e8);
  display: flex;
  width: 102px;
  height: 12px;
  flex-direction: column;
`;
const Div150 = styled.div`
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  background-color: var(--Light-Orange, #fff7e8);
  display: flex;
  width: 148px;
  height: 12px;
  flex-direction: column;
`;
const Div151 = styled.div`
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  background-color: var(--Light-Orange, #fff7e8);
  display: flex;
  width: 117px;
  height: 12px;
  flex-direction: column;
`;

const Div1111 = styled.div`
  // width: 25%;
  // height: 25%;
  // overflow: hidden;
  // border-radius: 50%;

  align-items: center;
  border-radius: 16px;
  // background-color: var(--Light-Orange, #fff7e8);
  display: flex;
  aspect-ratio: 1;
  flex-direction: column;
  justify-content: center;
  width: 50px;
  height: 50px;
  padding: 0 12px;
`;
const Div1112 = styled.div`
  // width: 25%;
  // height: 25%;
  // overflow: hidden;
  // border-radius: 50%;

  align-items: center;
  border-radius: 16px;
  // background-color: var(--Light-Orange, #fff7e8);
  display: flex;
  aspect-ratio: 1;
  flex-direction: column;
  justify-content: center;
  width: 50px;
  height: 50px;
  padding: 0 12px;
`;